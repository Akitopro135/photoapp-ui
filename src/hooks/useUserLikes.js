import { useEffect, useState } from 'react';
import { getUserLikes } from '~/services';
import requestKey from '~/utils/request';
import useScroll from './useScroll';

function useUserLike({ userName, pageInput = 1, perPage, orderBy, orientation, checkScroll = false }) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [data, setData] = useState([]);

    // Sử dụng useScroll với checkScroll cụ thể cho useUserLike
    const { page: likePage, setPage } = useScroll({ checkScroll: checkScroll });

    useEffect(() => {
        setData([]);
        setPage(1);
    }, [userName]);

    useEffect(() => {
        if (loading) {
            return;
        }
        setLoading(true);
        const getPhotos = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const photos = await getUserLikes(unsplash, token, {
                    userName: userName,
                    page: checkScroll ? likePage : pageInput,
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
    }, [likePage, userName]);

    useEffect(() => {
        if (likePage === 1 || data.length === 0) {
            setData(photos.results);
        } else if (checkScroll) {
            const newPhotos = photos.results.filter((photo) => !data.some((p) => p.id === photo.id));
            setData((prevPhotos) => [...prevPhotos, ...newPhotos]);
        }
    }, [photos.results]);

    return { data, photos, loading, error };
}

export default useUserLike;
