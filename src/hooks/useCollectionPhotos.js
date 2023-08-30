import { useState, useEffect } from 'react';
import { getCollectionPhotos } from '~/services/searchServices';
import requestKey from '~/utils/request';

function useCollectionPhotos({ id, page, perPage, order_by }) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        const getPhotos = async () => {
            try {
                (async () => {
                    const { unsplash, token } = await requestKey();

                    const photo = await getCollectionPhotos(unsplash, token, {
                        collectionId: id,
                        page,
                        perPage,
                        order_by,
                    });
                    setPhotos(photo);
                })();
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
