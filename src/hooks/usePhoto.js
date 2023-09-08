import { useState, useEffect } from 'react';
import { getDetailPhoto } from '~/services';
import requestKey from '~/utils/request';

function usePhoto({ id }) {
    const [photo, setPhoto] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        const getPhoto = async () => {
            try {
                (async () => {
                    const { unsplash, token } = await requestKey();

                    const photo = await getDetailPhoto(unsplash, id, token);
                    setPhoto(photo);
                })();
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
