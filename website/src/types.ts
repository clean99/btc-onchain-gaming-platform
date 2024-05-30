export enum GameStatus {
    Pending = 0,
    Started = 1,
    Ended = 2,
}
export interface Collection {
    id: number;
    collection_id: string;
    name: string;
    description: string;
    img_url: string;
    author: string;
    price: number;
    status: GameStatus;
    number: number;
    homepage: string;
}

export interface Inscription {
    id: number;
    collection_id: string;
    inscription_id: string;
    content: Record<string, string>;
    address: string;
    img_url: string;
}