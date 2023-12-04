import { useEffect, useState } from 'react';
import unsplash from '..';
import { ListCollectionParams } from '../params/collections';

function useCollections(collectionInput = ListCollectionParams) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getPhotos = () => {
        if (loading) return;
        setLoading(true);
        unsplash.collection
            .list({
                ...ListCollectionParams,
                ...collectionInput,
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.log('Collection Page Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getPhotos();
    }, [collectionInput.page, collectionInput.per_page]);

    return {
        data,
        loading,
        error,
    };
}

export default useCollections;
