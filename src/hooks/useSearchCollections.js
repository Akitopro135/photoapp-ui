import { useEffect, useState } from 'react';
import requestKey from '~/utils/request';

function useSearchCollections({ query, page, perPage }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        const getList = async () => {
            try {
                const { unsplash, token } = requestKey();

                const data = await unsplash.search.getCollections({
                    query,
                    page,
                    perPage,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(data.response);
            } catch (error) {
                console.log('SearchPage Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getList();
    }, [page, query]);

    return { data, total: data.total, loading, error };
}

export default useSearchCollections;
