import { useEffect, useState } from 'react';
import unsplash from '..';
import { ListUserLikePhotoParams } from '../params/users';

function useUserLike(userInput = ListUserLikePhotoParams) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getPhotos = () => {
        if (loading) return;
        setLoading(true);

        unsplash.user
            .listLikedPhotos({ ...ListUserLikePhotoParams, ...userInput })
            .then((data) => setData(data))
            .catch((error) => {
                console.log('User Page List Like Photos Error: ' + error);
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

export default useUserLike;
