import { useState, useEffect } from 'react';
import unsplash from '..';

function usePhoto({ id }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getPhoto = () => {
        if (loading) return;
        setLoading(true);
        unsplash.photo
            .get(id)
            .then((data) => setData(data))
            .catch((error) => {
                console.log('Detail Page Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (id && id !== data?.id) {
            getPhoto();
        }
    }, [id]);

    return {
        data,
        loading,
        error,
    };
}

export default usePhoto;
