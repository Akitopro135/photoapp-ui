import { useState, useEffect } from 'react';
import { getSearch } from '~/services/searchServices';

function useSearch({ query, page, perPage, order_by }) {
    const [listPhoto, setListPhoto] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        const getList = async () => {
            try {
                const list = await getSearch({
                    query,
                    page,
                    perPage,
                    order_by,
                });
                setListPhoto(list);
            } catch (error) {
                console.log('List: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getList();
    }, [query, page, perPage, order_by]);
    return {
        listPhoto,
        loading,
        error,
    };
}

export default useSearch;
