import { useEffect, useState } from 'react';
import { getUserLikes } from '~/services';
import requestKey from '~/utils/request';
import useScroll from './useScroll';

function useUserLike({ userName, pageInput, perPage, orderBy, orientation, checkScroll = false }) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [data, setData] = useState([]);

    const { page } = useScroll();

    useEffect(() => {
        setLoading(true);
        const getPhotos = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const photos = await getUserLikes(unsplash, token, {
                    userName: userName,
                    page: checkScroll ? page.current : pageInput,
                    perPage: perPage,
                    orderBy: orderBy,
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
    }, [page.current]);

    useEffect(() => {
        if (checkScroll) {
            if (page.current === 1 || data.length === 0) {
                setData(photos.results);
            } else {
                const newPhotos = photos.results.filter((photo) => !data.some((p) => p.id === photo.id));
                setData((prevPhotos) => [...prevPhotos, ...newPhotos]);
            }
        }
    }, [photos.results]);

    return { data, photos, loading, error };
}

export default useUserLike;
