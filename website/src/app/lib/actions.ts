'use server';
import { Collection, Inscription } from '@/types';
import { sql } from '@vercel/postgres';

export async function createInscriptionAction(data: FormData) {
    const rowDataFromForm = {
        inscription_id: data.get('inscription_id'),
        collection_id: data.get('collection_id'),
        content: data.get('content'),
        address: data.get('address'),
        img_url: data.get('img_url'),
    }

    if(!rowDataFromForm.address || !rowDataFromForm.inscription_id || !rowDataFromForm.collection_id || !rowDataFromForm.content) {
        throw new Error('Missing required fields');
    }

    try {
        // Insert into inscription table
        const result = await sql`
            INSERT INTO inscription (address, inscription_id, collection_id, content, img_url)
            VALUES (${rowDataFromForm.address as string}, ${rowDataFromForm.inscription_id as string}, ${rowDataFromForm.collection_id as string}, ${rowDataFromForm.content as string}, ${rowDataFromForm.img_url as string})
            RETURNING id
        `;

    } catch (error) {
        console.error('Database error:', error);
    }
}

export const fetchMineInscriptions = async (address: string) => {
    console.log('address', address);
    const result = await sql`
        SELECT * FROM inscription WHERE address = ${address}
    `;

    return result.rows as Inscription[];
}

export const fetchAllCollections = async (): Promise<Collection[]> => {
    try {
        const result = await sql`
            SELECT 
                id, 
                collection_id, 
                name, 
                description, 
                img_url, 
                author, 
                price, 
                status, 
                number, 
                homepage, 
                game_url 
            FROM collection
        `;

        return result.rows as Collection[];
    } catch (error) {
        console.error('Error fetching collections:', error);
        throw error;
    }
}

