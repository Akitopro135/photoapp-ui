import { useState, useEffect } from 'react';
import requestKey from '~/utils/request';

function useList({ page, perPage, order_by }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        const getList = async () => {
            try {
                (async () => {
                    const { unsplash, token } = await requestKey();

                    const list = await unsplash.photos.list({
                        page: page,
                        perPage: perPage,
                        orderBy: order_by,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setData(list.response.results);
                })();
            } catch (error) {
                console.log('List: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getList();
    }, []);
    return {
        data,
        loading,
        error,
    };
}

export default useList;
