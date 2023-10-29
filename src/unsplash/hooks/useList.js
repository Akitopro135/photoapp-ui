import { useState, useEffect } from 'react';
import unsplash from '..';
import { ListPhotoParams } from '../params/photos';

function useList(photoInput = ListPhotoParams) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getList = () => {
        if (loading) return;
        setLoading(true);
        unsplash.photo
            .list({
                ...ListPhotoParams,
                ...photoInput,
            })
            .then((data) => setData(data))
            .catch((error) => {
                console.log('PhotoPage Error List: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getList();
    }, []);

    return {
        data,
        loading,
        error,
    };
}

export default useList;
