'use server';
import { Inscription } from '@/types';
import { sql } from '@vercel/postgres';


export async function createInscriptionAction(data: FormData) {
    const rowDataFromForm = {
        inscription_id: data.get('inscription_id'),
        collection_id: data.get('collection_id'),
        content: data.get('content'),
        address: data.get('address'),
        img_url: data.get('img_url'),
    }

    console.log('rowDataFromForm', rowDataFromForm);

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

        console.log(result);
    } catch (error) {
        console.error('Database error:', error);
    }
}

export const fetchMineInscriptions = async (address: string) => {
    const result = await sql`
        SELECT * FROM inscription WHERE address = ${address}
    `;

    return result.rows as Inscription[];
}