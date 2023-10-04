import { useState, useEffect } from 'react';
import requestKey from '~/utils/request';

function useCollectionPhotos({ id, page, perPage, order_by }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        const getPhotos = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const photo = await unsplash.collections.getPhotos({
                    collectionId: id,
                    page,
                    perPage: perPage,
                    orderBy: order_by,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(photo.response);
            } catch (error) {
                console.log('Collection Page Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getPhotos();
    }, [id, page]);

    return {
        data,
        total: data.total,
        loading,
        error,
    };
}

export default useCollectionPhotos;
