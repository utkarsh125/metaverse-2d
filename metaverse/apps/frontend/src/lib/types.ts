export interface Avatar {
    id: string;
    name: string;
    imageUrl: string;
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