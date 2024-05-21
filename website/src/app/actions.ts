'use server';


export async function createInscriptionAction(data: FormData) {
    const rowDataFromForm = {
        inscription_id: data.get('inscription_id'),
        collection_id: data.get('collection_id'),
        content: data.get('content'),
        address: data.get('address'),
    }

    console.log('rowDataFromForm', rowDataFromForm);
}