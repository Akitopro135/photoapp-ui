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

    const like = () => {
        if (!data) return;
        const liked_by_user = data.liked_by_user;
        setLikeState(!liked_by_user);

        if (!liked_by_user)
            unsplash.photo
                .like(id)
                .then((data) => !data.photo.liked_by_user && setLikeState(false))
                .catch((error) => console.error('Like: ', error));
        else
            unsplash.photo
                .unLike(id)
                .then((data) => data.photo.liked_by_user && setLikeState(true))
                .catch((error) => console.error('Unlike: ', error));
    };

    function setLikeState(isLike) {
        if (!data) return;
        const newPhoto = {
            ...data,
            liked_by_user: isLike,
            likes: isLike ? data.likes + 1 : data.likes - 1,
        };
        setData(newPhoto);
    }

    useEffect(() => {
        if (id && id !== data?.id) {
            getPhoto();
        }
    }, [id]);

    return {
        data,
        like,
        loading,
        error,
    };
}

export default usePhoto;
