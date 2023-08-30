import { useState, useEffect } from 'react';
import { getCollectionInfo } from '~/services/searchServices';
import requestKey from '~/utils/request';

function useCollectionInfo({ id }) {
    const [collectionInfo, setCollectionInfo] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        const getCollectionDetail = async () => {
            try {
                (async () => {
                    const { unsplash, token } = await requestKey();

                    const photo = await getCollectionInfo(unsplash, token, {
                        collectionId: id,
                    });
                    setCollectionInfo(photo);
                })();
            } catch (error) {
                console.log('Detail Page Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getCollectionDetail();
    }, [id]);

    return {
        collectionInfo,
        loading,
        error,
    };
}

export default useCollectionInfo;
