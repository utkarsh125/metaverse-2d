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