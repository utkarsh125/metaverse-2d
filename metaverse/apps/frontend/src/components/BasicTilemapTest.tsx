'use client';

import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

export default function BasicTilemapTest() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let app: PIXI.Application;

    async function runPixi() {
      if (!canvasRef.current) return;

      app = new PIXI.Application();
      await app.init({
        width: 1200,
        height: 900,
        backgroundColor: 0x1099bb,
        view: canvasRef.current,
      });

      // Add a debug rectangle to confirm PIXI is working
      const debugRect = new PIXI.Graphics();
      debugRect.rect(0, 0, 100, 100).fill({ color: 0xFF0000 });
      app.stage.addChild(debugRect);

      // Add a container for the map with some offset
      const mapContainer = new PIXI.Container();
      mapContainer.x = 50;
      mapContainer.y = 50;
      
      // Add a visible border to the map container for debugging
      const border = new PIXI.Graphics();
      border.lineStyle(2, 0x00FF00);
      border.rect(0, 0, 32 * 32, 24 * 32); // 32x24 tiles * 32px each
      mapContainer.addChild(border);
      
      app.stage.addChild(mapContainer);

      // Load and render the map
      await loadMap(app, mapContainer);
    }

    runPixi();

    return () => {
      if (app) app.destroy(true);
    };
  }, []);

  const loadMap = async (app: PIXI.Application, mapContainer: PIXI.Container) => {
    try {
      console.log('Loading map...');
      
      // Load the map JSON
      const mapResponse = await fetch('/map/meadow/map1.tmj');
      if (!mapResponse.ok) {
        throw new Error(`Failed to load map: ${mapResponse.statusText}`);
      }
      
      const mapData = await mapResponse.json();
      console.log('Map data loaded:', mapData);

      // Load all tilesets
      const tilesetTextures = new Map<number, PIXI.Texture>();
      
      for (const tileset of mapData.tilesets) {
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

      // Render all layers
      for (const layer of mapData.layers) {
        if (layer.type === 'tilelayer' && layer.visible && layer.data) {
          console.log(`Rendering layer: ${layer.name} with ${layer.data.length} tiles`);
          await renderLayer(layer, mapData, tilesetTextures, mapContainer);
        }
      }

    } catch (error) {
      console.error('Error loading map:', error);
    }
  };

  const renderLayer = async (
    layer: { name: string; data: number[]; width?: number; height?: number }, 
    mapData: { tilewidth: number; tileheight: number; tilesets: Array<{ firstgid: number; source: string }> }, 
    tilesetTextures: Map<number, PIXI.Texture>, 
    container: PIXI.Container
  ) => {
    const tileWidth = mapData.tilewidth;
    const tileHeight = mapData.tileheight;
    const layerWidth = layer.width || Math.sqrt(layer.data.length);
    const layerHeight = layer.height || layerWidth;

    console.log(`Layer ${layer.name}: ${layerWidth}x${layerHeight} tiles`);

    for (let y = 0; y < layerHeight; y++) {
      for (let x = 0; x < layerWidth; x++) {
        const index = y * layerWidth + x;
        const tileId = layer.data[index];

        if (tileId === 0) continue; // Empty tile

        // Find which tileset this tile belongs to
        let tileset = null;
        let localTileId = tileId;
        
        for (let i = mapData.tilesets.length - 1; i >= 0; i--) {
          const ts = mapData.tilesets[i];
          if (tileId >= ts.firstgid) {
            tileset = ts;
            localTileId = tileId - ts.firstgid;
            break;
          }
        }

        if (!tileset) {
          console.warn(`No tileset found for tile ID ${tileId}`);
          continue;
        }

        const texture = tilesetTextures.get(tileset.firstgid);
        if (!texture) {
          console.warn(`No texture found for tileset ${tileset.source}`);
          continue;
        }

        // Create sprite for this tile
        const sprite = new PIXI.Sprite(texture);
        sprite.x = x * tileWidth;
        sprite.y = y * tileHeight;
        
        // Extract the correct tile from the tileset texture
        const tilesPerRow = Math.floor(texture.width / tileWidth);
        const tileX = (localTileId % tilesPerRow) * tileWidth;
        const tileY = Math.floor(localTileId / tilesPerRow) * tileHeight;
        
        // Create a new texture with the correct frame for this specific tile
        const frame = new PIXI.Rectangle(tileX, tileY, tileWidth, tileHeight);
        // @ts-ignore - PIXI v8 texture frame handling
        const tileTexture = new PIXI.Texture(texture.baseTexture, frame);
        sprite.texture = tileTexture;
        
        // For debugging, add a colored tint to see if sprites are being created
        sprite.tint = 0xFFFFFF;
        
        container.addChild(sprite);
        
        // Log first few tiles to see what's happening
        if (x < 3 && y < 3) {
          console.log(`Tile at (${x}, ${y}): ID=${tileId}, tileset=${tileset.source}, localID=${localTileId}, frame=(${tileX},${tileY},${tileWidth},${tileHeight}), sprite=(${sprite.x},${sprite.y})`);
        }
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