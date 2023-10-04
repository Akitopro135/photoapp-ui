import { useState, useEffect } from 'react';
import requestKey from '~/utils/request';

function useUser({ username }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        const getUserInfo = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const data = await unsplash.users.get({
                    username,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(data.response);
            } catch (error) {
                console.log('User Page Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getUserInfo();
    }, [username]);

    return {
        data,
        loading,
        error,
    };
}

export default useUser;
