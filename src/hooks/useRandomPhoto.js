import { useEffect, useState } from 'react';
import requestKey from '~/utils/request';

function useRandomPhoto() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        const getPhoto = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const data = await unsplash.photos.getRandom({
                    query: 'camera',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(data.response);
            } catch (error) {
                console.log('RandomPhoto: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getPhoto();
    }, []);
    return {
        data,
        loading,
        error,
    };
}

export default useRandomPhoto;
