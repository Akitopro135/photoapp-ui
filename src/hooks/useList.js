import { useState, useEffect } from 'react';
import { getPhoto } from '~/services/searchServices';

function useList({ page, perPage, order_by }) {
    const [listPhoto, setListPhoto] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        const getList = async () => {
            try {
                const list = await getPhoto({
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
    }, []);
    return {
        listPhoto,
        loading,
        error,
    };
}

export default useList;
