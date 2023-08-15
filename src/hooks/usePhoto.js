import { useState, useEffect } from 'react';
import { getDetailPhoto } from '~/services/searchServices';

function usePhoto({ id }) {
    const [photo, setPhoto] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getPhoto = async () => {
        try {
            const photo = await getDetailPhoto(id);
            setPhoto(photo);
            setLoading(false);
        } catch (error) {
            console.log('Detail Page Error: ' + error);
            setError(error);
        }
    };

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        getPhoto();
    }, [id]);

    return {
        photo,
        loading,
        error,
    };
}

export default usePhoto;
