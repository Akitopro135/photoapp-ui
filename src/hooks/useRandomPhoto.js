import { getRandomPhoto } from '~/services';
import { useEffect, useState } from 'react';
import requestKey from '~/utils/request';

function useRandomPhoto() {
    const [photo, setPhoto] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        const getPhoto = async () => {
            try {
                (async () => {
                    const { unsplash, token } = await requestKey();

                    const photo = await getRandomPhoto(unsplash, token);
                    setPhoto(photo);
                })();
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
