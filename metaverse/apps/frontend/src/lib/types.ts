export interface User {
  id: string;
  username: string;
  avatarId?: string;
  role: 'Admin' | 'User';
  avatar?: Avatar;
}

export interface Avatar {
  id: string;
  imageUrl?: string;
  name?: string;
}

export interface Space {
  id: string;
  name: string;
  width: number;
  height: number;
  thumbnail: string | null;
  creatorId: string;
  creator: User;
  elements: SpaceElement[];
  invites: SpaceInvite[];
  mapId?: string;
  map?: Map;
}

export interface SpaceInvite {
  id: string;
  spaceId: string;
  space: Space;
  inviterId: string;
  inviter: User;
  inviteeId: string;
  invitee: User;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  createdAt: string;
}

export interface Element {
  id: string;
  width: number;
  height: number;
  static: boolean;
  imageUrl: string;
  collisionZone: string;
  collisionMask?: string;
}

export interface SpaceElement {
  id: string;
  elementId: string;
  spaceId: string;
  x: number;
  y: number;
  element: Element;
}

export interface Map {
  id: string;
  width: number;
  height: number;
  name: string;
  thumbnail: string | null;
  description?: string;
  isPublic: boolean;
  creatorId?: string;
  mapElements: MapElement[];
}

export interface MapElement {
  id: string;
  mapId: string;
  elementId: string;
  x?: number;
  y?: number;
  element: Element;
}

// PixiJS specific types
export interface PixiUser {
  id: string;
  username: string;
  x: number;
  y: number;
  avatar?: string;
  color: string;
}

export interface PixiElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  imageUrl: string;
  static: boolean;
}

// WebSocket message types
export interface WSMessage {
  type: 'join' | 'move' | 'space-joined' | 'user-joined' | 'movement' | 'user-left' | 'movement-rejected' | 'chat' | 'user_joined' | 'user_left' | 'user_moved' | 'chat_message' | 'invite_sent' | 'invite_accepted' | 'invite_declined';
  payload?: Record<string, unknown>;
  data?: UserMoveData | ChatMessageData | PixiUser | SpaceInvite | Record<string, unknown>;
}

export interface UserMoveData {
  userId: string;
  x: number;
  y: number;
}

export interface ChatMessageData {
  userId: string;
  username: string;
  message: string;
  timestamp: string;
}

export interface Space{
    id: string;
    name: string;
    thumbnail: string | null;
    dimensions: string;
}

export interface MapTheme {
  id: string
  name: string
  thumbnail: string | null
  dimensions: string // e.g. "1024x768"
}

// Collision system types
export type CollisionZone = 
  | 'none'      // Fully walkable
  | 'full'      // Fully blocked
  | 'top'       // Blocked on top half
  | 'bottom'    // Blocked on bottom half
  | 'left'      // Blocked on left half
  | 'right'     // Blocked on right half
  | 'center'    // Blocked in center
  | 'corners'   // Blocked in corners
  | 'custom';   // Custom collision pattern

export interface MetaverseElement {
  id: string;
  imageUrl: string;
  width: number;
  height: number;
  static: boolean;
  collisionZone: CollisionZone;
  collisionPattern?: number[][]; // For custom patterns
  x: number; // Position X
  y: number; // Position Y
}

export interface MetaverseMap {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundImage?: string;
  collisionLayer: number[][]; // 0 = walkable, 1 = blocked
  spawnPoints: { x: number; y: number }[];
  elements: MetaverseElement[];
}

export interface MetaversePlayer {
  id: string;
  username: string;
  x: number;
  y: number;
  avatarId?: string;
}