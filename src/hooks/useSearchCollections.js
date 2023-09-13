import { useEffect, useState } from 'react';
import { getSearchCollection } from '~/services';
import requestKey from '~/utils/request';
import useScroll from './useScroll';

function useSearchCollections({ query, pageInput, perPage, checkScroll = false }) {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [data, setData] = useState([]);

    const { page } = useScroll({ checkScroll });

    useEffect(() => {
        if (loading) {
            return;
        }
        setLoading(true);
        const getList = async () => {
            try {
                const { unsplash, token } = requestKey();

                const collections = await getSearchCollection(unsplash, token, {
                    query,
                    page: checkScroll ? page : pageInput,
                    perPage,
                });

                setCollections(collections);
            } catch (error) {
                console.log('SearchPage Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getList();
    }, [page]);

    useEffect(() => {
        if (page === 1 || data.length === 0) {
            setData(collections.results);
        } else if (checkScroll) {
            const newCollections = collections.results.filter(
                (collection) => !data.some((p) => p.id === collection.id),
            );
            setData((prevCollections) => [...prevCollections, ...newCollections]);
        }
    }, [collections.results]);

    return { data, collections, loading, error };
}

export default useSearchCollections;
