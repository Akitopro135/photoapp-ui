import { useState, useEffect } from 'react';
import { getPhoto } from '~/services';
import requestKey from '~/utils/request';

function useList({ page, perPage, order_by }) {
    const [listPhoto, setListPhoto] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading) {
            return;
        }
        setLoading(true);
        const getList = async () => {
            try {
                (async () => {
                    const { unsplash, token } = await requestKey();

                    const list = await getPhoto(unsplash, token, {
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
