import { useState, useEffect } from 'react';
import requestKey from '~/utils/request';

function useCollectionInfo({ id }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        const getCollectionDetail = async () => {
            try {
                (async () => {
                    const { unsplash, token } = await requestKey();

                    const photo = await unsplash.collections.get({
                        collectionId: id,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setData(photo.response);
                })();
            } catch (error) {
                console.log('Collection Page Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getCollectionDetail();
    }, [id]);

    return {
        data,
        loading,
        error,
    };
}

export default useCollectionInfo;
