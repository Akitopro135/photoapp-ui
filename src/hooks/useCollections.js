import { useEffect, useState } from 'react';
import { getCollections } from '~/services/searchServices';
import requestKey from '~/utils/request';

function useCollections({ page, perPage }) {
    const [collections, setCollections] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        const getPhotos = async () => {
            try {
                (async () => {
                    const { unsplash, token } = await requestKey();

                    const data = await getCollections(unsplash, token, {
                        page,
                        perPage,
                    });
                    setCollections(data);
                })();
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
