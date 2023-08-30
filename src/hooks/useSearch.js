import { useState, useEffect, useRef } from 'react';
import { getSearch } from '~/services/searchServices';
import requestKey from '~/utils/request';

function useSearch({ query, page, perPage, order_by }) {
    const [listPhoto, setListPhoto] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const prevPage = useRef(0);

    useEffect(() => {
        setLoading(true);
        const getList = async () => {
            try {
                (async () => {
                    const { unsplash, token } = await requestKey();

                    const list = await getSearch(unsplash, token, {
                        query,
                        page,
                        perPage,
                        order_by,
                    });
                    setListPhoto(list);
                })();
            } catch (error) {
                console.log('List: ' + error);
                setError(error);
            } finally {
                setLoading(false);
                prevPage.current = page;
            }
        };

        if (page !== prevPage.current) {
            getList();
        }

        prevPage.current = page;
    }, [page]);
    return {
        listPhoto,
        loading,
        error,
    };
}

export default useSearch;
