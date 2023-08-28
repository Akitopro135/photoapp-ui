import { useEffect, useState } from 'react';
import { getCollections } from '~/services/searchServices';

function useCollections({ page, perPage }) {
    const [collections, setCollections] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        const getPhotos = async () => {
            try {
                const data = await getCollections({
                    page,
                    perPage,
                });
                setCollections(data);
            } catch (error) {
                console.log('Detail Page Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getPhotos();
    }, [page, perPage]);

    return {
        collections,
        loading,
        error,
    };
}

export default useCollections;
