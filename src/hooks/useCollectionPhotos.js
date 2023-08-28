import { useState, useEffect } from 'react';
import { getCollectionPhotos } from '~/services/searchServices';

function useCollectionPhotos({ id, page, perPage, order_by }) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        const getPhotos = async () => {
            try {
                const photo = await getCollectionPhotos({
                    collectionId: id,
                    page,
                    perPage,
                    order_by,
                });
                setPhotos(photo);
            } catch (error) {
                console.log('Detail Page Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getPhotos();
    }, [id, page, perPage, order_by]);

    return {
        photos,
        loading,
        error,
    };
}

export default useCollectionPhotos;
