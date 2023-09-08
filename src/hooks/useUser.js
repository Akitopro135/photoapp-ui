import { useState, useEffect } from 'react';
import { getUser } from '~/services';
import requestKey from '~/utils/request';

function useUser({ username }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        const getUserInfo = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const user = await getUser(unsplash, token, {
                    userName: username,
                });
                setUser(user);
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
        user,
        loading,
        error,
    };
}

export default useUser;
