import { useState, useEffect } from 'react';
import unsplash from '..';

function useCollectionInfo({ id }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getCollectionDetail = () => {
        if (loading || id === undefined) return;
        setLoading(true);
        unsplash.collection
            .get(id)
            .then((data) => setData(data))
            .catch((error) => {
                console.log('Collection Page Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (id && id !== data?.id) {
            getCollectionDetail();
        }
    }, [id]);

    return {
        data,
        loading,
        error,
    };
}

export default useCollectionInfo;
