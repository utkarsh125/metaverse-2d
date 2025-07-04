import * as PIXI from 'pixi.js';

export interface TiledMap {
  width: number;
  height: number;
  tilewidth: number;
  tileheight: number;
  layers: TiledLayer[];
  tilesets: TiledTileset[];
}

export interface TiledLayer {
  id: number;
  name: string;
  type: 'tilelayer' | 'objectgroup';
  data?: number[];
  properties?: TiledProperty[];
  visible: boolean;
  opacity: number;
  width?: number;
  height?: number;
}

export interface TiledTileset {
  firstgid: number;
  source: string;
  tileset?: TiledTilesetData;
}

export interface TiledTilesetData {
  name: string;
  tilewidth: number;
  tileheight: number;
  tilecount: number;
  columns: number;
  image: {
    source: string;
    width: number;
    height: number;
  };
  tiles?: TiledTile[];
}

export interface TiledTile {
  id: number;
  properties?: TiledProperty[];
}

export interface TiledProperty {
  name: string;
  type: string;
  value: string | number | boolean;
}

export interface CollisionData {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'tile' | 'object';
  layerId: number;
}

export class TilemapRenderer {
  private app: PIXI.Application;
  private container: PIXI.Container;
  private tilemap: PIXI.Container;
  private mapData: TiledMap | null = null;
  private tilesets: Map<number, PIXI.Texture> = new Map();
  private collisionData: CollisionData[] = [];
  private tileSize = 32;
  private mapBaseDir: string = '';

  constructor(app: PIXI.Application, container: PIXI.Container) {
    this.app = app;
    this.container = container;
    
    // Validate inputs
    if (!container) {
      throw new Error('Container is required for TilemapRenderer');
    }
    
    // Create a regular PIXI container for the tilemap
    this.tilemap = new PIXI.Container();
    this.tilemap.sortableChildren = true;  // Enable z-index sorting
    this.tilemap.zIndex = 0;  // Base z-index for tilemap
    
    // Validate tilemap creation
    if (!this.tilemap) {
      throw new Error('Failed to create Tilemap container');
    }
    
    // Position the tilemap at (0,0) relative to its container
    this.tilemap.position.set(0, 0);
    
    // Add debug visual for tilemap bounds
    const debugGraphics = new PIXI.Graphics();
    debugGraphics.lineStyle(2, 0xFF0000);
    debugGraphics.drawRect(0, 0, 100, 100);
    debugGraphics.zIndex = 1000;  // Always on top for debugging
    this.tilemap.addChild(debugGraphics);
    
    this.container.addChild(this.tilemap);
    
    console.log('TilemapRenderer initialized:', {
      containerPosition: { x: this.container.position.x, y: this.container.position.y },
      tilemapPosition: { x: this.tilemap.position.x, y: this.tilemap.position.y },
      tilemapZIndex: this.tilemap.zIndex
    });
}

  async loadMap(mapUrl: string): Promise<void> {
    try {
      console.log('=== TilemapRenderer.loadMap START ===');
      console.log('Loading map from:', mapUrl);
      // Track the base directory of the map file
      this.mapBaseDir = mapUrl.substring(0, mapUrl.lastIndexOf('/') + 1);
      console.log('Map base directory:', this.mapBaseDir);
      
      // Load the map JSON file
      const response = await fetch(mapUrl);
      if (!response.ok) {
        throw new Error(`Failed to load map: ${response.statusText} (${response.status})`);
      }
      this.mapData = await response.json();
      console.log('Map data loaded successfully:', this.mapData);
      
      // Load all tilesets
      console.log('Starting to load tilesets...');
      await this.loadTilesets();
      console.log('Tilesets loaded successfully');
      
      // Render the map
      console.log('Starting to render map...');
      await this.renderMap();
      console.log('Map rendered successfully');
      
      // Extract collision data
      console.log('Extracting collision data...');
      this.extractCollisionData();
      console.log('Collision data extracted');
      
      console.log('=== TilemapRenderer.loadMap SUCCESS ===');
      console.log('Tilemap loaded successfully!');
    } catch (error) {
      console.error('=== TilemapRenderer.loadMap ERROR ===');
      console.error('Error loading map:', error);
      throw error;
    }
  }

  private async loadTilesets(): Promise<void> {
    if (!this.mapData) return;
    console.log(`Loading ${this.mapData.tilesets.length} tilesets...`);
    for (const tileset of this.mapData.tilesets) {
      try {
        console.log(`Loading tileset: ${tileset.source}`);
        // Load the tileset TSX file, resolve relative to map base dir
        const tsxUrl = this.getTilesetUrl(tileset.source, this.mapBaseDir);
        console.log(`TSX URL: ${tsxUrl}`);
        const tsxResponse = await fetch(tsxUrl);
        if (!tsxResponse.ok) {
          console.warn(`Failed to load tileset ${tileset.source}: ${tsxResponse.statusText} (${tsxResponse.status})`);
          continue;
        }
        const tsxText = await tsxResponse.text();
        console.log(`TSX content length: ${tsxText.length}`);
        // Track the base directory of the TSX file
        const tsxBaseDir = tsxUrl.substring(0, tsxUrl.lastIndexOf('/') + 1);
        const tilesetData = this.parseTSX(tsxText);
        tileset.tileset = tilesetData;
        // Load the tileset image, resolve relative to TSX base dir
        const imageUrl = this.getImageUrl(tilesetData.image.source, tsxBaseDir);
        console.log(`Image URL: ${imageUrl}`);
        const texture = await PIXI.Assets.load(imageUrl);
        this.tilesets.set(tileset.firstgid, texture);
        console.log(`Loaded tileset: ${tileset.source} (firstgid: ${tileset.firstgid})`);
      } catch (error) {
        console.error(`Error loading tileset ${tileset.source}:`, error);
      }
    }
    console.log(`Successfully loaded ${this.tilesets.size} tilesets`);
  }

  private parseTSX(tsxText: string): TiledTilesetData {
    // Simple XML parsing for TSX files
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(tsxText, 'text/xml');
    const tilesetElement = xmlDoc.querySelector('tileset');
    
    if (!tilesetElement) {
      throw new Error('Invalid TSX file: no tileset element found');
    }

    const imageElement = tilesetElement.querySelector('image');
    if (!imageElement) {
      throw new Error('Invalid TSX file: no image element found');
    }

    const tilesetData: TiledTilesetData = {
      name: tilesetElement.getAttribute('name') || '',
      tilewidth: parseInt(tilesetElement.getAttribute('tilewidth') || '32'),
      tileheight: parseInt(tilesetElement.getAttribute('tileheight') || '32'),
      tilecount: parseInt(tilesetElement.getAttribute('tilecount') || '0'),
      columns: parseInt(tilesetElement.getAttribute('columns') || '0'),
      image: {
        source: imageElement.getAttribute('source') || '',
        width: parseInt(imageElement.getAttribute('width') || '0'),
        height: parseInt(imageElement.getAttribute('height') || '0')
      },
      tiles: []
    };

    // Parse tile properties (for collision data)
    const tileElements = tilesetElement.querySelectorAll('tile');
    tileElements.forEach(tileElement => {
      const tileId = parseInt(tileElement.getAttribute('id') || '0');
      const properties: TiledProperty[] = [];
      
      const propertyElements = tileElement.querySelectorAll('property');
      propertyElements.forEach(propElement => {
        properties.push({
          name: propElement.getAttribute('name') || '',
          type: propElement.getAttribute('type') || 'string',
          value: this.parsePropertyValue(propElement)
        });
      });

      if (properties.length > 0) {
        tilesetData.tiles!.push({
          id: tileId,
          properties
        });
      }
    });

    return tilesetData;
  }

  private parsePropertyValue(propElement: Element): string | number | boolean {
    const type = propElement.getAttribute('type');
    const value = propElement.getAttribute('value');
    
    if (type === 'bool') {
      return value === 'true';
    } else if (type === 'int') {
      return parseInt(value || '0');
    } else if (type === 'float') {
      return parseFloat(value || '0');
    } else {
      return value || '';
    }
  }

  private getTilesetUrl(source: string, baseDir: string): string {
    // If source is absolute (starts with /), return as is
    if (source.startsWith('/')) return source;
    // Otherwise, resolve relative to baseDir
    return baseDir + source;
  }

  private getImageUrl(source: string, baseDir: string): string {
    // If source is absolute (starts with /), return as is
    if (source.startsWith('/')) return source;
    // Otherwise, resolve relative to baseDir
    return baseDir + source;
  }

  private async renderMap(): Promise<void> {
    if (!this.mapData) {
      console.error('No map data loaded');
      return;
    }

    console.log('=== renderMap START ===');
    console.log('Map dimensions:', {
      width: this.mapData.width * this.mapData.tilewidth,
      height: this.mapData.height * this.mapData.tileheight
    });

    // Clear existing children (except debug graphics)
    const debugGraphics = this.tilemap.getChildAt(0) as PIXI.Graphics;
    this.tilemap.removeChildren();
    this.tilemap.addChild(debugGraphics);

    // Update debug bounds
    debugGraphics.clear();
    debugGraphics.lineStyle(2, 0xFF0000);
    debugGraphics.drawRect(
      0, 0,
      this.mapData.width * this.mapData.tilewidth,
      this.mapData.height * this.mapData.tileheight
    );

    let totalTilesRendered = 0;
    // Render all layers using the fixed renderLayer
    for (const layer of this.mapData.layers) {
      if (layer.type === 'tilelayer' && layer.visible) {
        console.log(`Rendering layer: ${layer.name}`);
        const layerTiles = this.renderLayer(layer);
        totalTilesRendered += layerTiles;
        console.log(`Layer ${layer.name} rendered ${layerTiles} tiles`);
      }
    }
    
    console.log(`=== renderMap SUCCESS: ${totalTilesRendered} total tiles rendered ===`);
    
    // Log final positions
    console.log('Final positions:', {
      containerPosition: { x: this.container.position.x, y: this.container.position.y },
      tilemapPosition: { x: this.tilemap.position.x, y: this.tilemap.position.y },
      mapDimensions: {
        width: this.mapData.width * this.mapData.tilewidth,
        height: this.mapData.height * this.mapData.tileheight
      }
    });
}

  private renderLayer(layer: TiledLayer): number {
    if (!layer.data) return 0;

    // Create a container for this layer
    const layerContainer = new PIXI.Container();
    layerContainer.alpha = layer.opacity ?? 1.0;
    this.tilemap.addChild(layerContainer);

    const tileWidth = this.mapData!.tilewidth;
    const tileHeight = this.mapData!.tileheight;
    const layerWidth = layer.width || this.mapData!.width;
    const layerHeight = layer.height || this.mapData!.height;

    // Handle Tiled flipping/rotation bits
    const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
    const FLIPPED_VERTICALLY_FLAG   = 0x40000000;
    const FLIPPED_DIAGONALLY_FLAG   = 0x20000000;

    let tilesRendered = 0;
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
        const tileset = this.findTilesetForTile(gid);
        let localTileId = gid;
        if (tileset) {
          localTileId = gid - tileset.firstgid;
        }

        if (!tileset) {
          console.warn(`No tileset found for tile ID ${gid}`);
          continue;
        }

        const texture = this.tilesets.get(tileset.firstgid);
        if (!texture) {
          console.warn(`No texture found for tileset ${tileset.source}`);
          continue;
        }

        // Debug first few tiles
        if (x < 3 && y < 3) {
          console.log(`Tile at (${x},${y}): GID=${tileId}, gid(no flip)=${gid}, tileset=${tileset.source}, firstgid=${tileset.firstgid}, localTileId=${localTileId}, flipH=${flippedHorizontally}, flipV=${flippedVertically}, flipD=${flippedDiagonally}`);
        }

        // Extract the correct tile from the tileset texture
        const tilesPerRow = Math.floor(texture.width / tileWidth);
        const tileX = (localTileId % tilesPerRow) * tileWidth;
        const tileY = Math.floor(localTileId / tilesPerRow) * tileHeight;

        // Create a new texture for this tile using PIXI v8's method
        const tileTexture = new PIXI.Texture({
          source: texture.source,
          frame: new PIXI.Rectangle(tileX, tileY, tileWidth, tileHeight),
          orig: new PIXI.Rectangle(0, 0, tileWidth, tileHeight)
        });

        // Create sprite and add to layer container
        const sprite = new PIXI.Sprite(tileTexture);
        sprite.x = x * tileWidth;
        sprite.y = y * tileHeight;

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
          sprite.rotation = Math.PI / 2;
          const temp = sprite.x;
          sprite.x = sprite.y;
          sprite.y = temp;
        }

        layerContainer.addChild(sprite);
        tilesRendered++;
      }
    }
    
    console.log(`Layer ${layer.name} rendered ${tilesRendered} tiles`);
    return tilesRendered;
}

  private findTilesetForTile(tileId: number): TiledTileset | undefined {
    if (!this.mapData) return undefined;

    // Find the tileset with the highest firstgid that's <= tileId
    let bestTileset: TiledTileset | undefined;
    let bestGid = 0;

    for (const tileset of this.mapData.tilesets) {
      if (tileset.firstgid <= tileId && tileset.firstgid > bestGid) {
        bestTileset = tileset;
        bestGid = tileset.firstgid;
      }
    }

    return bestTileset;
  }

  private extractCollisionData(): void {
    if (!this.mapData) return;

    this.collisionData = [];

    for (const layer of this.mapData.layers) {
      if (layer.type === 'tilelayer' && layer.data) {
        this.extractLayerCollisionData(layer);
      }
    }
  }

  private extractLayerCollisionData(layer: TiledLayer): void {
    if (!layer.data || !this.mapData) return;

    // Check if layer has collidable property
    const isCollidableLayer = layer.properties?.some(prop => 
      prop.name === 'collidable' && prop.value === true
    );

    for (let y = 0; y < this.mapData.height; y++) {
      for (let x = 0; x < this.mapData.width; x++) {
        const index = y * this.mapData.width + x;
        const tileId = layer.data[index];
        
        if (tileId > 0) {
          // Check if this specific tile is collidable
          const isCollidableTile = this.isTileCollidable(tileId);
          
          if (isCollidableLayer || isCollidableTile) {
            this.collisionData.push({
              x: x * this.tileSize,
              y: y * this.tileSize,
              width: this.tileSize,
              height: this.tileSize,
              type: 'tile',
              layerId: layer.id
            });
          }
        }
      }
    }
  }

  private isTileCollidable(tileId: number): boolean {
    // Find the tileset for this tile
    const tileset = this.findTilesetForTile(tileId);
    if (!tileset?.tileset) return false;

    // Calculate local tile ID
    const localTileId = tileId - tileset.firstgid;
    
    // Check if this tile has collidable property
    const tile = tileset.tileset.tiles?.find(t => t.id === localTileId);
    return tile?.properties?.some(prop => 
      prop.name === 'collidable' && prop.value === true
    ) || false;
  }

  public isColliding(x: number, y: number, width: number, height: number): boolean {
    for (const collision of this.collisionData) {
      if (this.checkCollision(
        { x, y, width, height },
        collision
      )) {
        return true;
      }
    }
    return false;
  }

  private checkCollision(rect1: { x: number; y: number; width: number; height: number }, 
                        rect2: { x: number; y: number; width: number; height: number }): boolean {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }

  public getMapBounds(): { width: number; height: number } {
    if (!this.mapData) return { width: 0, height: 0 };
    
    return {
      width: this.mapData.width * this.tileSize,
      height: this.mapData.height * this.tileSize
    };
  }

  public getCollisionData(): CollisionData[] {
    return [...this.collisionData];
  }

  public destroy(): void {
    this.tilemap.destroy();
    this.tilesets.clear();
    this.collisionData = [];
    this.mapData = null;
  }

  async render(): Promise<void> {
    if (!this.mapData) {
      console.error('No map data loaded');
      return;
    }

    console.log('Rendering map with tilesets:', this.mapData.tilesets.length);
    console.log('Rendering map with layers:', this.mapData.layers.length);

    // Load all tilesets first
    const tilesetTextures: Map<number, PIXI.Texture> = new Map();
    for (const tileset of this.mapData.tilesets) {
      try {
        const tilesetData = await this.loadTileset(tileset.source);
        if (tilesetData && tilesetData.image) {
          // Pass the correct baseDir for the image
          const tsxUrl = this.getTilesetUrl(tileset.source, this.mapBaseDir);
          const tsxBaseDir = tsxUrl.substring(0, tsxUrl.lastIndexOf('/') + 1);
          const texture = await PIXI.Assets.load(this.getImageUrl(tilesetData.image.source, tsxBaseDir));
          tilesetTextures.set(tileset.firstgid, texture);
          console.log(`Loaded tileset ${tileset.source} with firstgid ${tileset.firstgid}`);
        }
      } catch (error) {
        console.error(`Failed to load tileset ${tileset.source}:`, error);
      }
    }
    // Render all layers
    for (const layer of this.mapData.layers) {
      if (layer.type === 'tilelayer' && layer.visible) {
        console.log(`Rendering layer: ${layer.name} with ${layer.data?.length || 0} tiles`);
        await this.renderLayerMulti(layer, tilesetTextures);
      }
    }
    // Extract collision data from object layers
    this.extractCollisionData();
  }

  private async renderLayerMulti(
    layer: TiledLayer, 
    tilesetTextures: Map<number, PIXI.Texture>
  ): Promise<void> {
    if (!layer.data) return;

    const tileWidth = this.mapData!.tilewidth;
    const tileHeight = this.mapData!.tileheight;
    const layerWidth = layer.width || this.mapData!.width;
    const layerHeight = layer.height || this.mapData!.height;

    // Tiled flipping flags
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
        for (let i = 0; i < this.mapData!.tilesets.length; i++) {
          const ts = this.mapData!.tilesets[i];
          const nextTs = this.mapData!.tilesets[i + 1];
          if (gid >= ts.firstgid && (!nextTs || gid < nextTs.firstgid)) {
            tileset = ts;
            localTileId = gid - ts.firstgid;
            break;
          }
        }

        if (!tileset) continue;
        const texture = tilesetTextures.get(tileset.firstgid);
        if (!texture) continue;

        // Use map's tile size for both frame and placement
        const tilesPerRow = Math.floor(texture.width / tileWidth);
        const tileX = (localTileId % tilesPerRow) * tileWidth;
        const tileY = Math.floor(localTileId / tilesPerRow) * tileHeight;

        // PixiJS v8+ way: create a new texture with the correct frame
        const frame = new PIXI.Rectangle(tileX, tileY, tileWidth, tileHeight);
        const tileTexture = new PIXI.Texture({
          source: texture.source,
          frame,
        });
        const sprite = new PIXI.Sprite(tileTexture);
        sprite.x = x * tileWidth;
        sprite.y = y * tileHeight;

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
          sprite.rotation = Math.PI / 2;
          const temp = sprite.x;
          sprite.x = sprite.y;
          sprite.y = temp;
        }

        sprite.tint = 0xFFFFFF;
        this.tilemap.addChild(sprite);
      }
    }
  }

  private async loadTileset(source: string): Promise<TiledTilesetData | null> {
    try {
      const tsxUrl = this.getTilesetUrl(source, this.mapBaseDir);
      const tsxResponse = await fetch(tsxUrl);
      if (!tsxResponse.ok) {
        console.warn(`Failed to load tileset ${source}: ${tsxResponse.statusText}`);
        return null;
      }
      const tsxText = await tsxResponse.text();
      return this.parseTSX(tsxText);
    } catch (error) {
      console.error(`Error loading tileset ${source}:`, error);
      return null;
    }
  }
} 