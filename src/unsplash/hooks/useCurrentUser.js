import { useEffect, useState } from 'react';
import unsplash from '..';

function useCurrentUser() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getUserInfo = () => {
        if (loading) return;
        setLoading(true);

        unsplash.current_user
            .get()
            .then((data) => {
                setData(data);
                localStorage.setItem('currentId', data.id);
            })
            .catch((error) => {
                console.log('Current User Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return { data, loading, error };
}

export default useCurrentUser;
