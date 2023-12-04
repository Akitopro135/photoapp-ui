import { useState, useEffect } from 'react';
import unsplash from '..';
import { GetCollectionPhotosParams } from '../params/collections';

function useCollectionPhotos(collectionInput = GetCollectionPhotosParams) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getPhotos = () => {
        if (loading) return;
        setLoading(true);

        unsplash.collection
            .getPhotos({
                ...GetCollectionPhotosParams,
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
        if (collectionInput.id && collectionInput.id !== data?.id) {
            getPhotos();
        }
    }, [collectionInput.id, collectionInput.page]);

    return {
        data,
        loading,
        error,
    };
}

export default useCollectionPhotos;
