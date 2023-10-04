import { useEffect, useState } from 'react';
import requestKey from '~/utils/request';

function useUserCollection({ userName, page, perPage }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        const getCollections = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const data = await unsplash.users.getCollections({
                    username: userName,
                    page,
                    perPage: perPage,
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

        getCollections();
    }, [page, userName]);

    return {
        data,
        total: data.total,
        loading,
        error,
    };
}

export default useUserCollection;
