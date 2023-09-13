import { useState, useEffect, useRef } from 'react';
import { getSearch } from '~/services';
import requestKey from '~/utils/request';
import useScroll from './useScroll';

function useSearch({ query, pageInput, perPage, order_by, checkScroll = false }) {
    const [listPhoto, setListPhoto] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [data, setData] = useState([]);

    const { page } = useScroll({ checkScroll: checkScroll });

    useEffect(() => {
        if (loading) {
            return;
        }
        setLoading(true);
        const getList = async () => {
            try {
                (async () => {
                    const { unsplash, token } = await requestKey();

                    const list = await getSearch(unsplash, token, {
                        query,
                        page: checkScroll ? page : pageInput,
                        perPage,
                        order_by,
                    });
                    setListPhoto(list);
                })();
            } catch (error) {
                console.log('SearchPage Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getList();
    }, [page, query]);

    useEffect(() => {
        if (page === 1 || data.length === 0) {
            setData(listPhoto.results);
        } else if (checkScroll) {
            const newPhotos = listPhoto.results.filter((photo) => !data.some((p) => p.id === photo.id));
            setData((prevPhotos) => [...prevPhotos, ...newPhotos]);
        }
    }, [listPhoto.results]);

    return {
        data,
        listPhoto,
        loading,
        error,
    };
}

export default useSearch;
