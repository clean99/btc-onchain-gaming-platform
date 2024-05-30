'use server';
import { Collection, Inscription } from '@/types';
import { sql } from '@vercel/postgres';

export async function fetchCollections() {
    const result = await sql`
        SELECT * FROM collection
    `;

    return result.rows as Collection[];
}

export async function fetchCollection(collectionId: string) {
    const result = await sql`
        SELECT * FROM collection WHERE collection_id = ${collectionId}
    `;

    return result.rows[0] as Collection;
}

export async function fetchInscriptions(collectionId: string) {
    const result = await sql`
        SELECT * FROM inscription WHERE collection_id = ${collectionId}
    `;

    return result.rows as Inscription[];
}

