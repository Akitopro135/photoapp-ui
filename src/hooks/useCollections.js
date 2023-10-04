import { useEffect, useState } from 'react';
import requestKey from '~/utils/request';

function useCollections({ page, perPage }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        const getPhotos = async () => {
            try {
                (async () => {
                    const { unsplash, token } = await requestKey();

                    const data = await unsplash.collections.list({
                        page,
                        perPage,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setData(data.response);
                })();
            } catch (error) {
                console.log('Collection Page Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getPhotos();
    }, [page, perPage]);

    return {
        data,
        loading,
        error,
    };
}

export default useCollections;
