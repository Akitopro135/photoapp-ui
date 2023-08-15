import { getRandomPhoto } from '~/services/searchServices';
import { useEffect, useState } from 'react';

function useRandomPhoto() {
    const [photo, setPhoto] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        const getPhoto = async () => {
            try {
                const photo = await getRandomPhoto();
                setPhoto(photo);
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
        photo,
        loading,
        error,
    };
}

export default useRandomPhoto;
