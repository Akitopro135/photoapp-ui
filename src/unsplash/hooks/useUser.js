import { useState, useEffect } from 'react';
import unsplash from '..';

function useUser({ username }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getUserInfo = () => {
        if (loading) return;
        setLoading(true);

        unsplash.user
            .profile(username)
            .then((data) => setData(data))
            .catch((error) => {
                console.log('User Page Profile Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (username && username !== data?.username) {
            getUserInfo();
        }
    }, [username]);

    return {
        data,
        loading,
        error,
    };
}

export default useUser;
