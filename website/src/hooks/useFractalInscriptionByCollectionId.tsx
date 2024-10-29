import { useFractalInscription } from './useFractalInscription';
import { Inscription } from '@/types';

export const useFractalInscriptionByCollectionId = (collectionId: string, address: string) => {
  const { data, loading, error } = useFractalInscription(address, 0, 16);

  const filteredData = data?.filter((inscription: Inscription) => {
    return inscription.collection_id === collectionId;
  });

  return { data: filteredData, loading, error };
};
