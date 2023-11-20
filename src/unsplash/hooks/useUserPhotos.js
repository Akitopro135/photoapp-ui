import { useEffect, useState } from 'react';
import unsplash from '..';
import { ListUserPhotoParams } from '../params/users';

function useUserPhotos(userInput = ListUserPhotoParams) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getPhotos = () => {
        if (loading) return;
        setLoading(true);

        unsplash.user
            .listPhotos({ ...ListUserPhotoParams, ...userInput })
            .then((data) => setData(data))
            .catch((error) => {
                console.log('User Page List Photos Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (userInput.username && userInput.username !== data?.username) {
            getPhotos();
        }
    }, [userInput.page, userInput.username]);

    return {
        data,
        loading,
        error,
    };
}

export default useUserPhotos;
