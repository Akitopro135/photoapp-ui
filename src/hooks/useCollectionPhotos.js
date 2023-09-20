import { useState, useEffect } from 'react';
import { getCollectionPhotos } from '~/services';
import requestKey from '~/utils/request';
import useScroll from './useScroll';

function useCollectionPhotos({ id, pageInput, perPage, order_by, checkScroll = false }) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [data, setData] = useState([]);

    const { page } = useScroll({ checkScroll: checkScroll });

    useEffect(() => {
        if (loading) {
            return;
        }
        setLoading(true);
        const getPhotos = async () => {
            try {
                (async () => {
                    const { unsplash, token } = await requestKey();

                    const photo = await getCollectionPhotos(unsplash, token, {
                        collectionId: id,
                        page: checkScroll ? page : pageInput,
                        perPage,
                        order_by,
                    });
                    setPhotos(photo);
                })();
            } catch (error) {
                console.log('Collection Page Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getPhotos();
    }, [id, page, perPage, order_by]);

    useEffect(() => {
        if (page === 1 || data.length === 0) {
            setData(photos.results);
        } else {
            const newPhotos = photos.results.filter((photo) => !data.some((p) => p.id === photo.id));
            setData((prevPhotos) => [...prevPhotos, ...newPhotos]);
        }
    }, [photos.results]);

    return {
        data,
        photos,
        loading,
        error,
    };
}

export default useCollectionPhotos;
