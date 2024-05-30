'use server';
import { sql } from '@vercel/postgres';


export async function createInscriptionAction(data: FormData) {
    const rowDataFromForm = {
        inscription_id: data.get('inscription_id'),
        collection_id: data.get('collection_id'),
        content: data.get('content'),
        address: data.get('address'),
    }

    console.log('rowDataFromForm', rowDataFromForm);

    if(!rowDataFromForm.address || !rowDataFromForm.inscription_id || !rowDataFromForm.collection_id || !rowDataFromForm.content) {
        throw new Error('Missing required fields');
    }

    try {
        // Insert into inscription table
        const result = await sql`
            INSERT INTO inscription (address, inscription_id, collection_id) 
            VALUES (${rowDataFromForm.address as string}, ${rowDataFromForm.inscription_id as string}, ${rowDataFromForm.collection_id as string})
            RETURNING id
        `;

        console.log(result);

        // Insert into content table
        await sql`
            INSERT INTO content (inscription_id, content) 
            VALUES (${result.rows[0].id as string}, ${rowDataFromForm.content as string})
        `;
    } catch (error) {
        console.error('Database error:', error);
    }
}