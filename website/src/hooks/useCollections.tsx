import { useState, useEffect } from 'react';
import { fetchAllCollections } from '@/app/lib/actions';
import { Collection } from '@/types';

export const useCollections = () => {
    const [collections, setCollections] = useState<Collection[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllCollections();
                setCollections(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { collections, loading, error };
};
