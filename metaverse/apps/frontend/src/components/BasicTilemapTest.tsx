'use client';

import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

type TiledLayer = {
  name: string;
  type: string;
  data?: number[];
  width?: number;
  height?: number;
  visible?: boolean;
  opacity?: number;
};

type TiledTileset = {
  firstgid: number;
  source: string;
};

type TiledMapData = {
  width: number;
  height: number;
  tilewidth: number;
  tileheight: number;
  layers: TiledLayer[];
  tilesets: TiledTileset[];
  // Add more fields as needed
};

export default function BasicTilemapTest() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Use a ref for player position in tile coordinates
  const playerPosRef = useRef({ x: 2, y: 2 });

  useEffect(() => {
    let app: PIXI.Application;
    let playerSprite: PIXI.Sprite | null = null;
    let map: TiledMapData;
    const collidableSet = new Set<number>();
    let mapContainer: PIXI.Container;
    let animationFrame: number;

    function updatePlayerSprite() {
      if (!playerSprite || !map) return;
      playerSprite.x = (playerPosRef.current.x + 0.5) * map.tilewidth;
      playerSprite.y = (playerPosRef.current.y + 0.5) * map.tileheight;
    }

    function onKeyDown(e: KeyboardEvent) {
      let dx = 0, dy = 0;
      if (e.key === 'ArrowUp' || e.key === 'w') dy = -1;
      if (e.key === 'ArrowDown' || e.key === 's') dy = 1;
      if (e.key === 'ArrowLeft' || e.key === 'a') dx = -1;
      if (e.key === 'ArrowRight' || e.key === 'd') dx = 1;
      if (dx === 0 && dy === 0) return;
      const newX = playerPosRef.current.x + dx;
      const newY = playerPosRef.current.y + dy;
      if (!map) return;
      if (newX < 0 || newY < 0 || newX >= map.width || newY >= map.height) return;
      let blocked = false;
      for (const layer of map.layers) {
        if (layer.type === 'tilelayer' && layer.visible && layer.data) {
          const idx = newY * map.width + newX;
          const gid = layer.data[idx];
          if (collidableSet.has(gid)) blocked = true;
        }
      }
      if (!blocked) {
        playerPosRef.current = { x: newX, y: newY };
        updatePlayerSprite();
      }
    }

    async function runPixi() {
      if (!canvasRef.current) return;

      // Load the map JSON first to get map size
      const mapResponse = await fetch('/map/meadow/map1.tmj');
      if (!mapResponse.ok) {
        throw new Error(`Failed to load map: ${mapResponse.statusText}`);
      }
      map = await mapResponse.json();

      // Parse collidable tiles from tilesets
      for (const tileset of map.tilesets) {
        const tsxResponse = await fetch(`/map/meadow/${tileset.source}`);
        if (!tsxResponse.ok) continue;
        const tsxText = await tsxResponse.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(tsxText, 'text/xml');
        const tileElements = xmlDoc.querySelectorAll('tile');
        tileElements.forEach(tileEl => {
          const id = parseInt(tileEl.getAttribute('id') || '', 10);
          const props = tileEl.querySelectorAll('property');
          props.forEach(prop => {
            if (prop.getAttribute('name') === 'collidable' && prop.getAttribute('value') === 'true') {
              collidableSet.add(id + tileset.firstgid);
            }
          });
        });
      }

      app = new PIXI.Application();
      await app.init({
        width: 1200,
        height: 900,
        backgroundAlpha: 0, // transparent
        view: canvasRef.current,
      });

      // Add a container for the map at native scale, top-left
      mapContainer = new PIXI.Container();
      mapContainer.x = 0;
      mapContainer.y = 0;
      app.stage.addChild(mapContainer);

      // Load and render the map
      await loadMap(app, mapContainer, map);

      // Load player sprite (hero.png)
      const heroTexture = await PIXI.Assets.load('/sprite/hero.png');
      playerSprite = new PIXI.Sprite(heroTexture);
      playerSprite.anchor.set(0.5, 0.5);
      playerSprite.width = map.tilewidth;
      playerSprite.height = map.tileheight;
      mapContainer.addChild(playerSprite);

      // Initial player position
      updatePlayerSprite();

      // Keyboard movement
      window.addEventListener('keydown', onKeyDown);

      // Animation loop for updating player sprite
      function animate() {
        updatePlayerSprite();
        animationFrame = requestAnimationFrame(animate);
      }
      animate();
    }

    runPixi();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (app) app.destroy(true);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []); // Only run once!

  const loadMap = async (
    app: PIXI.Application,
    mapContainer: PIXI.Container,
    mapData?: TiledMapData
  ) => {
    let map: TiledMapData;
    if (!mapData) {
      const mapResponse = await fetch('/map/meadow/map1.tmj');
      if (!mapResponse.ok) {
        throw new Error(`Failed to load map: ${mapResponse.statusText}`);
      }
      map = await mapResponse.json();
    } else {
      map = mapData;
    }
    try {
      console.log('Loading map...');
      
      // Load all tilesets
      const tilesetTextures = new Map<number, PIXI.Texture>();
      
      for (const tileset of map.tilesets) {
        try {
          console.log(`Loading tileset: ${tileset.source}`);
          
          // Load the TSX file
          const tsxResponse = await fetch(`/map/meadow/${tileset.source}`);
          if (!tsxResponse.ok) {
            console.warn(`Failed to load tileset ${tileset.source}: ${tsxResponse.statusText}`);
            continue;
          }
          
          const tsxText = await tsxResponse.text();
          console.log(`TSX content for ${tileset.source}:`, tsxText.substring(0, 200) + '...');
          
          // Parse TSX to get image path
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(tsxText, 'text/xml');
          const imageElement = xmlDoc.querySelector('image');
          
          if (!imageElement) {
            console.warn(`No image element found in ${tileset.source}`);
            continue;
          }
          
          const imageSource = imageElement.getAttribute('source');
          if (!imageSource) {
            console.warn(`No source attribute found in ${tileset.source}`);
            continue;
          }
          
          console.log(`Image source for ${tileset.source}: ${imageSource}`);
          
          // Load the image texture
          const imageUrl = `/map/meadow/${imageSource}`;
          console.log(`Loading image from: ${imageUrl}`);
          
          const texture = await PIXI.Assets.load(imageUrl);
          tilesetTextures.set(tileset.firstgid, texture);
          
          console.log(`Successfully loaded tileset ${tileset.source} with firstgid ${tileset.firstgid}`);
          
        } catch (error) {
          console.error(`Error loading tileset ${tileset.source}:`, error);
        }
      }

      console.log(`Loaded ${tilesetTextures.size} tilesets`);

      // Render all layers in order (bottom to top)
      for (const layer of map.layers) {
        if (layer.type === 'tilelayer' && layer.visible && layer.data) {
          console.log(`Rendering layer: ${layer.name} with ${layer.data.length} tiles`);
          const layerContainer = new PIXI.Container();
          layerContainer.alpha = typeof layer.opacity === 'number' ? layer.opacity : 1.0;
          await renderLayer(
            { name: layer.name, data: layer.data, width: layer.width, height: layer.height },
            map,
            tilesetTextures,
            layerContainer
          );
          mapContainer.addChild(layerContainer);
        }
      }

    } catch (error) {
      console.error('Error loading map:', error);
    }
  };

  const renderLayer = async (
    layer: { name: string; data: number[]; width?: number; height?: number },
    mapData: TiledMapData,
    tilesetTextures: Map<number, PIXI.Texture>,
    container: PIXI.Container
  ) => {
    const tileWidth = mapData.tilewidth;
    const tileHeight = mapData.tileheight;
    const layerWidth = layer.width || Math.sqrt(layer.data.length);
    const layerHeight = layer.height || layerWidth;

    console.log(`Layer ${layer.name}: ${layerWidth}x${layerHeight} tiles`);

    // Handle Tiled flipping/rotation bits
    const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
    const FLIPPED_VERTICALLY_FLAG   = 0x40000000;
    const FLIPPED_DIAGONALLY_FLAG   = 0x20000000;

    for (let y = 0; y < layerHeight; y++) {
      for (let x = 0; x < layerWidth; x++) {
        const index = y * layerWidth + x;
        const tileId = layer.data[index];

        if (tileId === 0) continue; // Empty tile

        // Handle Tiled flipping/rotation bits
        const rawGid = tileId;
        const flippedHorizontally = (rawGid & FLIPPED_HORIZONTALLY_FLAG) !== 0;
        const flippedVertically   = (rawGid & FLIPPED_VERTICALLY_FLAG) !== 0;
        const flippedDiagonally   = (rawGid & FLIPPED_DIAGONALLY_FLAG) !== 0;
        const gid = rawGid & ~(FLIPPED_HORIZONTALLY_FLAG | FLIPPED_VERTICALLY_FLAG | FLIPPED_DIAGONALLY_FLAG);

        // Find which tileset this tile belongs to
        let tileset = null;
        let localTileId = gid;
        for (let i = 0; i < mapData.tilesets.length; i++) {
          const ts = mapData.tilesets[i];
          const nextTs = mapData.tilesets[i + 1];
          if (gid >= ts.firstgid && (!nextTs || gid < nextTs.firstgid)) {
            tileset = ts;
            localTileId = gid - ts.firstgid;
            break;
          }
        }

        if (!tileset) {
          console.warn(`No tileset found for tile ID ${gid}`);
          continue;
        }

        const texture = tilesetTextures.get(tileset.firstgid);
        if (!texture) {
          console.warn(`No texture found for tileset ${tileset.source}`);
          continue;
        }

        // Debug: Log mapping for first few tiles
        if (x < 3 && y < 3) {
          console.log(`Tile at (${x},${y}): GID=${tileId}, gid(no flip)=${gid}, tileset=${tileset.source}, firstgid=${tileset.firstgid}, localTileId=${localTileId}, flipH=${flippedHorizontally}, flipV=${flippedVertically}, flipD=${flippedDiagonally}`);
        }

        // Create sprite for this tile
        const sprite = new PIXI.Sprite(texture);
        sprite.x = x * tileWidth;
        sprite.y = y * tileHeight;
        
        // Extract the correct tile from the tileset texture
        const tilesPerRow = Math.floor(texture.width / tileWidth);
        const tileX = (localTileId % tilesPerRow) * tileWidth;
        const tileY = Math.floor(localTileId / tilesPerRow) * tileHeight;

        // PixiJS v8+ way: create a new texture with the correct frame
        const frame = new PIXI.Rectangle(tileX, tileY, tileWidth, tileHeight);
        const tileTexture = new PIXI.Texture({
          source: texture.source, // v8+ uses .source, not .baseTexture
          frame,
        });
        sprite.texture = tileTexture;
        
        // Apply flipping/rotation
        if (flippedHorizontally) {
          sprite.scale.x *= -1;
          sprite.x += tileWidth;
        }
        if (flippedVertically) {
          sprite.scale.y *= -1;
          sprite.y += tileHeight;
        }
        if (flippedDiagonally) {
          // Diagonal flip swaps x/y and may also flip
          sprite.rotation = Math.PI / 2;
          const temp = sprite.x;
          sprite.x = sprite.y;
          sprite.y = temp;
        }

        sprite.tint = 0xFFFFFF;
        container.addChild(sprite);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32 }}>
      <canvas ref={canvasRef} width={1200} height={900} className="border border-white" />
      <p style={{ color: '#888', marginTop: 8 }}>Tilemap should render with all layers and tilesets</p>
    </div>
  );
} 