import { useState, useEffect } from 'react';
import requestKey from '~/utils/request';

function usePhoto({ id }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        const getPhoto = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const data = await unsplash.photos.get({
                    photoId: id,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(data.response);
            } catch (error) {
                console.log('Detail Page Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getPhoto();
    }, [id]);

    return {
        data,
        loading,
        error,
    };
}

export default usePhoto;
