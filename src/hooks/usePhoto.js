import { useState, useEffect } from 'react';
import { getDetailPhoto } from '~/services/searchServices';

function usePhoto({ id }) {
    const [photo, setPhoto] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        const getPhoto = async () => {
            try {
                const photo = await getDetailPhoto(id);
                setPhoto(photo);
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
        photo,
        loading,
        error,
    };
}

export default usePhoto;
