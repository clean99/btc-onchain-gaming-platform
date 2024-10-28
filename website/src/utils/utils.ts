import { Collection } from "@/types";

export function isPasscard(collection: Collection): boolean {
    return collection.name === 'Jump Explorer';
}
