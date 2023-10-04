import { useEffect, useState } from 'react';
import requestKey from '~/utils/request';

function useUserLike({ userName, page, perPage, orderBy, orientation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        const getPhotos = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const data = await unsplash.users.getLikes({
                    username: userName,
                    page,
                    perPage: perPage,
                    orderBy: orderBy,
                    orientation: orientation,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(data.response);
            } catch (error) {
                console.log('User Page Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getPhotos();
    }, [page, userName]);

    return {
        data,
        total: data.total,
        loading,
        error,
    };
}

export default useUserLike;
