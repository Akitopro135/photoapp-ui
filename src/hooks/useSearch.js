import { useState, useEffect } from 'react';
import requestKey from '~/utils/request';

function useSearch({ query, page, perPage, order_by }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading || query === '') return;
        setLoading(true);
        const getList = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const list = await unsplash.search.getPhotos({
                    query,
                    page,
                    perPage: perPage,
                    orderBy: order_by,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(list.response);
            } catch (error) {
                console.log('SearchPage Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getList();
    }, [page, query]);

    return {
        data,
        total: data.total,
        loading,
        error,
    };
}

export default useSearch;
