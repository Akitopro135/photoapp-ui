import { useEffect, useState } from 'react';
import unsplash from '..';
import { ListRandomPhotosParams } from '../params/photos';

function useRandomPhoto(photoInput = ListRandomPhotosParams) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getPhoto = () => {
        if (loading) return;
        setLoading(true);
        unsplash.photo
            .random({
                ...ListRandomPhotosParams,
                ...photoInput,
            })
            .then((data) => setData(data))
            .catch((error) => {
                console.log('Random Photo Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getPhoto();
    }, []);

    return {
        data,
        loading,
        error,
    };
}

export default useRandomPhoto;
