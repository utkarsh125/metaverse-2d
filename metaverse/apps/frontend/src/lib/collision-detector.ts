import { CollisionZone, MetaverseElement } from './types';

const TILE_SIZE = 32;

// Predefined collision patterns for different zones
const COLLISION_PATTERNS: Record<CollisionZone, number[][]> = {
  'none': [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  'full': [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1]
  ],
  'top': [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  'bottom': [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1]
  ],
  'left': [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [1, 1, 0, 0]
  ],
  'right': [
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 0, 1, 1]
  ],
  'center': [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  'corners': [
    [1, 0, 0, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 1]
  ],
  'custom': [] // Will be provided by the element
};

export class CollisionDetector {
  private collisionLayer: number[][];
  private elements: MetaverseElement[];

  constructor(collisionLayer: number[][], elements: MetaverseElement[] = []) {
    this.collisionLayer = collisionLayer;
    this.elements = elements;
  }

  /**
   * Check if a position is walkable
   * @param x Player X position
   * @param y Player Y position
   * @returns true if position is blocked, false if walkable
   */
  isBlocked(x: number, y: number): boolean {
    // Check base collision layer first
    const tileX = Math.floor(x / TILE_SIZE);
    const tileY = Math.floor(y / TILE_SIZE);
    
    if (this.isOutOfBounds(tileX, tileY)) {
      return true; // Out of bounds is blocked
    }

    // Check if base tile is blocked
    if (this.collisionLayer[tileY]?.[tileX] === 1) {
      return true;
    }

    // Check element collision zones
    return this.checkElementCollision(x, y);
  }

  private isOutOfBounds(tileX: number, tileY: number): boolean {
    return tileX < 0 || tileY < 0 || 
           tileY >= this.collisionLayer.length || 
           tileX >= this.collisionLayer[0]?.length;
  }

  private checkElementCollision(x: number, y: number): boolean {
    for (const element of this.elements) {
      if (this.isPositionInElement(x, y, element)) {
        return this.checkElementZoneCollision(x, y, element);
      }
    }
    return false;
  }

  private isPositionInElement(x: number, y: number, element: MetaverseElement): boolean {
    const elementLeft = element.x;
    const elementRight = element.x + element.width;
    const elementTop = element.y;
    const elementBottom = element.y + element.height;

    return x >= elementLeft && x < elementRight && 
           y >= elementTop && y < elementBottom;
  }

  private checkElementZoneCollision(x: number, y: number, element: MetaverseElement): boolean {
    const zone = element.collisionZone;
    
    if (zone === 'none') {
      return false; // Always walkable
    }

    if (zone === 'full') {
      return true; // Always blocked
    }

    // Calculate relative position within the element
    const relativeX = x - element.x;
    const relativeY = y - element.y;

    // Get collision pattern
    const pattern = zone === 'custom' 
      ? element.collisionPattern 
      : COLLISION_PATTERNS[zone];

    if (!pattern) {
      return false;
    }

    // Convert pixel position to pattern grid position
    const patternX = Math.floor((relativeX / element.width) * pattern[0].length);
    const patternY = Math.floor((relativeY / element.height) * pattern.length);

    // Check if position is within pattern bounds
    if (patternY >= 0 && patternY < pattern.length && 
        patternX >= 0 && patternX < pattern[0].length) {
      return pattern[patternY][patternX] === 1;
    }

    return false;
  }

  /**
   * Get all walkable positions around a point
   * @param x Center X position
   * @param y Center Y position
   * @param radius Search radius in tiles
   * @returns Array of walkable positions
   */
  getWalkablePositions(x: number, y: number, radius: number = 1): { x: number; y: number }[] {
    const walkable: { x: number; y: number }[] = [];
    const centerTileX = Math.floor(x / TILE_SIZE);
    const centerTileY = Math.floor(y / TILE_SIZE);

    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const tileX = centerTileX + dx;
        const tileY = centerTileY + dy;
        
        // Check center of tile
        const checkX = tileX * TILE_SIZE + TILE_SIZE / 2;
        const checkY = tileY * TILE_SIZE + TILE_SIZE / 2;

        if (!this.isBlocked(checkX, checkY)) {
          walkable.push({ x: checkX, y: checkY });
        }
      }
    }

    return walkable;
  }

  /**
   * Find the nearest walkable position
   * @param x Target X position
   * @param y Target Y position
   * @param maxDistance Maximum search distance
   * @returns Nearest walkable position or null
   */
  findNearestWalkable(x: number, y: number, maxDistance: number = 5): { x: number; y: number } | null {
    const centerTileX = Math.floor(x / TILE_SIZE);
    const centerTileY = Math.floor(y / TILE_SIZE);

    // Search in expanding circles
    for (let radius = 0; radius <= maxDistance; radius++) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          // Only check the perimeter of the current radius
          if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
            const tileX = centerTileX + dx;
            const tileY = centerTileY + dy;
            
            const checkX = tileX * TILE_SIZE + TILE_SIZE / 2;
            const checkY = tileY * TILE_SIZE + TILE_SIZE / 2;

            if (!this.isBlocked(checkX, checkY)) {
              return { x: checkX, y: checkY };
            }
          }
        }
      }
    }

    return null;
  }
}

/**
 * Helper function to create custom collision patterns
 * @param pattern 2D array where 1 = blocked, 0 = walkable
 * @returns Collision pattern for an element
 */
export function createCustomCollisionPattern(pattern: number[][]): number[][] {
  return pattern;
}

/**
 * Common collision patterns for different object types
 */
export const COMMON_PATTERNS = {
  // Tree with trunk in center
  tree: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  
  // Rock with irregular shape
  rock: [
    [0, 1, 1, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 1, 1, 0]
  ],
  
  // Chair facing down
  chair: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  
  // Table
  table: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 0, 0]
  ]
}; 