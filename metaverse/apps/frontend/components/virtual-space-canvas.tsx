'use client'

import * as PIXI from 'pixi.js'

import { useCallback, useEffect, useRef, useState } from 'react'

import { gsap } from 'gsap'

interface User { 
  userId: string; 
  x: number; 
  y: number; 
  avatar?: string 
}

interface SpaceElement { 
  id: string; 
  x: number; 
  y: number; 
  width: number; 
  height: number; 
  imageUrl: string; 
  static: boolean 
}

interface SpaceData { 
  dimensions: string; 
  elements: SpaceElement[] 
}

interface VirtualSpaceCanvasProps { 
  spaceId: string; 
  token: string 
}

export default function VirtualSpaceCanvas({ spaceId, token }: VirtualSpaceCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<PIXI.Application | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const playerRef = useRef<PIXI.Container | null>(null)
  const usersRef = useRef<Map<string, PIXI.Container>>(new Map())
  const elementsRef = useRef<PIXI.Container[]>([])
  const keysRef = useRef<Set<string>>(new Set())
  const isInitializedRef = useRef(false)

  const [isConnected, setIsConnected] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 })
  const [spaceData, setSpaceData] = useState<SpaceData | null>(null)
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 })
  const [error, setError] = useState<string | null>(null)

  // Validate required props
  if (!spaceId || !token) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-xl mb-2">Missing Configuration</h2>
          <p>Space ID and authentication token are required.</p>
        </div>
      </div>
    )
  }

  const BACKEND_URL = 'http://localhost:3000'
  const TILE_SIZE = 32
  const PLAYER_SIZE = 28
  const MOVE_SPEED = 0.2

  // Get WebSocket URL safely
  const getWebSocketUrl = useCallback(() => {
    if (typeof window === 'undefined') return 'ws://localhost:4000'
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const host = window.location.hostname
    return `${protocol}//${host}:4000`
  }, [])

  // Helper function to create player sprite
  const createPlayerSprite = useCallback((x: number, y: number, isMe: boolean, id?: string) => {
    const cont = new PIXI.Container()
    
    // Body circle
    const circ = new PIXI.Graphics()
      .fill(isMe ? 0x3498db : 0xe74c3c)
      .circle(0, 0, PLAYER_SIZE / 2)
      .stroke({ width: 3, color: 0xffffff })
    cont.addChild(circ)
    
    // Shadow
    const shadow = new PIXI.Graphics()
      .fill({ color: 0x000000, alpha: 0.3 })
      .ellipse(0, PLAYER_SIZE / 2 + 5, PLAYER_SIZE / 2 - 2, 8)
    cont.addChild(shadow)
    
    // Name tag
    const style = new PIXI.TextStyle({
      fontSize: 12,
      fill: 0xffffff,
      fontFamily: 'Arial',
      stroke: { color: 0x000000, width: 2 }
    })
    const txt = new PIXI.Text(isMe ? 'You' : `User ${id?.slice(-4) || 'Unknown'}`, style)
    txt.anchor.set(0.5)
    txt.y = -PLAYER_SIZE - 10
    cont.addChild(txt)

    cont.x = x * TILE_SIZE + TILE_SIZE / 2
    cont.y = y * TILE_SIZE + TILE_SIZE / 2
    
    if (isMe) {
      cont.eventMode = 'static'
      cont.cursor = 'pointer'
    }
    
    return cont
  }, [TILE_SIZE, PLAYER_SIZE])

  // Helper function to draw grid
  const drawGrid = useCallback((app: PIXI.Application, width: number, height: number) => {
    const grid = new PIXI.Graphics()
      .stroke({ width: 1, color: 0x2c3e50, alpha: 0.3 })
    
    // Vertical lines
    for (let x = 0; x <= width; x++) {
      grid.moveTo(x * TILE_SIZE, 0)
      grid.lineTo(x * TILE_SIZE, height * TILE_SIZE)
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y++) {
      grid.moveTo(0, y * TILE_SIZE)
      grid.lineTo(width * TILE_SIZE, y * TILE_SIZE)
    }
    
    grid.stroke()
    app.stage.addChild(grid)
  }, [TILE_SIZE])

  // Initialize PIXI application and load space data
  useEffect(() => {
    if (isInitializedRef.current || !canvasRef.current) return
    
    let resizeHandler: (() => void) | null = null

    const initializeApp = async () => {
      try {
        // Initialize PIXI Application
        const app = new PIXI.Application()
        await app.init({
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 0x34495e,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        })

        if (!canvasRef.current) return
        canvasRef.current.appendChild(app.canvas as HTMLCanvasElement)
        appRef.current = app
        
        app.stage.eventMode = 'static'
        app.stage.hitArea = app.screen

        // Handle window resize
        resizeHandler = () => {
          if (appRef.current) {
            appRef.current.renderer.resize(window.innerWidth, window.innerHeight)
          }
        }
        window.addEventListener('resize', resizeHandler)

        // Fetch space data
        const response = await fetch(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        if (!response.ok) {
          throw new Error(`Failed to load space: ${response.statusText}`)
        }
        
        const mapData = await response.json() as SpaceData
        setSpaceData(mapData)
        
        const [width, height] = mapData.dimensions.split('x').map(Number)
        setDimensions({ width, height })

        // Draw grid
        drawGrid(app, width, height)

        // Draw space elements
        for (const element of mapData.elements) {
          const container = new PIXI.Container()
          
          try {
            const texture = await PIXI.Assets.load(element.imageUrl)
            const sprite = new PIXI.Sprite(texture)
            sprite.width = element.width * TILE_SIZE
            sprite.height = element.height * TILE_SIZE
            container.addChild(sprite)
          } catch (error) {
            console.warn(`Failed to load image for element ${element.id}:`, error)
            // Fallback rectangle
            const graphics = new PIXI.Graphics()
              .fill(0x8e44ad)
              .roundRect(0, 0, element.width * TILE_SIZE, element.height * TILE_SIZE, 8)
              .stroke({ width: 2, color: 0x9b59b6 })
            container.addChild(graphics)
          }
          
          container.x = element.x * TILE_SIZE
          container.y = element.y * TILE_SIZE
          app.stage.addChild(container)
          elementsRef.current.push(container)
        }

        // Create player sprite
        const playerSprite = createPlayerSprite(0, 0, true)
        app.stage.addChild(playerSprite)
        playerRef.current = playerSprite

        // Handle stage clicks for movement
        app.stage.on('pointerdown', (event: PIXI.FederatedPointerEvent) => {
          const globalPos = event.global
          const newX = Math.floor(globalPos.x / TILE_SIZE)
          const newY = Math.floor(globalPos.y / TILE_SIZE)
          
          // Check bounds
          if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
            if (wsRef.current?.readyState === WebSocket.OPEN) {
              wsRef.current.send(JSON.stringify({ 
                type: 'move', 
                payload: { x: newX, y: newY } 
              }))
            }
          }
        })

        isInitializedRef.current = true
      } catch (error) {
        console.error('Failed to initialize app:', error)
      }
    }

    initializeApp()

    return () => {
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler)
      }
      if (appRef.current) {
        appRef.current.destroy(true)
        appRef.current = null
      }
      isInitializedRef.current = false
    }
  }, [spaceId, token, BACKEND_URL, createPlayerSprite, drawGrid])

  // WebSocket connection
  useEffect(() => {
    if (wsRef.current || !token) return // Don't connect without a token

    const wsUrl = getWebSocketUrl()
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      console.log('WebSocket connected')
      setIsConnected(true)
      setError(null)
      ws.send(JSON.stringify({ 
        type: 'join', 
        payload: { spaceId, token } 
      }))
    }

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        console.log('WS ←', message)
        
        switch (message.type) {
          case 'space-joined':
            if (message.payload.users) {
              setUsers(message.payload.users)
            }
            if (message.payload.spawn) {
              const { x, y } = message.payload.spawn
              setPlayerPosition({ x, y })
              if (playerRef.current) {
                playerRef.current.x = x * TILE_SIZE + TILE_SIZE / 2
                playerRef.current.y = y * TILE_SIZE + TILE_SIZE / 2
              }
            }
            break

          case 'user-joined':
            setUsers(currentUsers => [
              ...currentUsers,
              { 
                userId: message.payload.userId, 
                x: message.payload.x, 
                y: message.payload.y 
              }
            ])
            
            if (appRef.current) {
              const userSprite = createPlayerSprite(
                message.payload.x, 
                message.payload.y, 
                false, 
                message.payload.userId
              )
              appRef.current.stage.addChild(userSprite)
              usersRef.current.set(message.payload.userId, userSprite)
            }
            break

          case 'movement':
            const userSprite = usersRef.current.get(message.payload.userId)
            if (userSprite && message.payload.userId !== 'current_user_id') { // Replace with actual user ID check
              gsap.to(userSprite, {
                x: message.payload.x * TILE_SIZE + TILE_SIZE / 2,
                y: message.payload.y * TILE_SIZE + TILE_SIZE / 2,
                duration: MOVE_SPEED,
                ease: 'power2.out'
              })
            }
            
            // Update users state
            setUsers(currentUsers => 
              currentUsers.map(user => 
                user.userId === message.payload.userId 
                  ? { ...user, x: message.payload.x, y: message.payload.y }
                  : user
              )
            )
            break

          case 'user-left':
            if (message.payload.userId) {
              const userSprite = usersRef.current.get(message.payload.userId)
              if (userSprite && appRef.current) {
                appRef.current.stage.removeChild(userSprite)
                usersRef.current.delete(message.payload.userId)
              }
              setUsers(currentUsers => 
                currentUsers.filter(user => user.userId !== message.payload.userId)
              )
            }
            break

          case 'movement-rejected':
            console.warn('Movement rejected:', message.payload)
            break

          default:
            console.log('Unknown message type:', message.type)
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }

    ws.onclose = (event) => {
      console.log('WebSocket disconnected', event.code, event.reason)
      setIsConnected(false)
      wsRef.current = null
      
      // Set appropriate error message based on close code
      if (event.code === 1002) {
        setError('Authentication failed - Invalid token')
      } else if (event.code === 1003) {
        setError('Invalid data sent to server')
      } else if (event.code !== 1000) {
        setError(`Connection closed unexpectedly (${event.code})`)
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      setError('Connection error occurred')
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
    }
  }, [spaceId, token, getWebSocketUrl, createPlayerSprite])

  // Keyboard movement
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        event.preventDefault()
        
        const { x, y } = playerPosition
        let newX = x, newY = y
        
        if (key === 'arrowup' || key === 'w') newY--
        if (key === 'arrowdown' || key === 's') newY++
        if (key === 'arrowleft' || key === 'a') newX--
        if (key === 'arrowright' || key === 'd') newX++
        
        // Check bounds
        if (newX >= 0 && newX < dimensions.width && newY >= 0 && newY < dimensions.height) {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ 
              type: 'move', 
              payload: { x: newX, y: newY } 
            }))
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playerPosition, dimensions])

  // Sync player position with sprite animation
  useEffect(() => {
    if (!playerRef.current) return
    
    gsap.to(playerRef.current, {
      x: playerPosition.x * TILE_SIZE + TILE_SIZE / 2,
      y: playerPosition.y * TILE_SIZE + TILE_SIZE / 2,
      duration: MOVE_SPEED,
      ease: 'power2.out'
    })
  }, [playerPosition])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={canvasRef} className="w-full h-full" />

      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
        <div className="text-sm space-y-1">
          <div>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</div>
          <div>Users: {users.length + 1}</div>
          <div>Position: ({playerPosition.x}, {playerPosition.y})</div>
          {spaceData && (
            <div>Space: {dimensions.width}x{dimensions.height}</div>
          )}
          {error && (
            <div className="text-red-400 mt-2">❌ {error}</div>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
        <div className="text-sm">
          <div>🎮 WASD or Arrow Keys to move</div>
          <div>🖱️ Click to move to location</div>
        </div>
      </div>

      {error && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-red-900 border border-red-700 text-white p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-bold mb-2">Connection Error</h3>
            <p className="mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  )
}