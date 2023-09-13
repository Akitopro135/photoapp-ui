import { useEffect, useState } from 'react';
import { getUserPhotos } from '~/services';
import requestKey from '~/utils/request';
import useScroll from './useScroll';

function useUserPhotos({ userName, pageInput = 1, perPage, orderBy, stats, orientation, checkScroll = false }) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [data, setData] = useState([]);

    // Sử dụng useScroll với checkScroll cụ thể cho useUserPhotos
    const { page } = useScroll({
        checkScroll: checkScroll,
    });

    useEffect(() => {
        if (loading) {
            return;
        }
        setLoading(true);
        const getPhotos = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const photos = await getUserPhotos(unsplash, token, {
                    userName: userName,
                    page: checkScroll ? page : pageInput,
                    perPage: perPage,
                    orderBy: orderBy,
                    stats: stats,
                    orientation: orientation,
                });

                setPhotos(photos);
            } catch (error) {
                console.log('User Page Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getPhotos();
    }, [page]);

    useEffect(() => {
        if (page === 1 || data.length === 0) {
            setData(photos.results);
        } else if (checkScroll) {
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

export default useUserPhotos;
