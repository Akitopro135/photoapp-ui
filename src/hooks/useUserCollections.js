import { useEffect, useState } from 'react';
import { getUserCollections } from '~/services';
import requestKey from '~/utils/request';
import useScroll from './useScroll';

function useUserCollection({ userName, pageInput, perPage, checkScroll = false }) {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [data, setData] = useState([]);

    const { page, setPage } = useScroll({ checkScroll: checkScroll });

    useEffect(() => {
        setData([]);
        setPage(1);
    }, [userName]);

    useEffect(() => {
        if (loading) {
            return;
        }
        setLoading(true);
        const getCollections = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const collections = await getUserCollections(unsplash, token, {
                    userName: userName,
                    page: checkScroll ? page : pageInput,
                    perPage: perPage,
                });

                setCollections(collections);
            } catch (error) {
                console.log('User Page Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        getCollections();
    }, [page, userName]);

    useEffect(() => {
        if (page === 1 || data.length === 0) {
            setData(collections.results);
        } else if (checkScroll) {
            const newCollections = collections.results.filter(
                (collection) => !data.some((p) => p.id === collection.id),
            );
            setData((prevCollection) => [...prevCollection, ...newCollections]);
        }
    }, [collections.results]);

    return {
        data,
        collections,
        loading,
        error,
    };
}

export default useUserCollection;
