export interface OutgoingMessage {
  type: string;
  payload: Record<string, unknown>;
}

export interface IncomingMessage {
  type: string;
  payload: Record<string, unknown>;
}

export interface SpaceJoinedPayload {
  spawn: { x: number; y: number };
  users: Array<{ id: string }>;
}

export interface UserJoinedPayload {
  userId: string;
  x: number;
  y: number;
  name: string;
  avatar: string;
}

export interface MovementPayload {
  userId: string;
  x: number;
  y: number;
}

export interface ChatPayload {
  userId: string;
  username: string;
  message: string;
}

export interface UserLeftPayload {
  userId: string;
}

export interface MovementRejectedPayload {
  x: number;
  y: number;
}