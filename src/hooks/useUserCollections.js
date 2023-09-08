import { useEffect, useState } from 'react';
import { getUserCollections } from '~/services';
import requestKey from '~/utils/request';
import useScroll from './useScroll';

function useUserCollection({ userName, pageInput, perPage, checkScroll = false }) {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [data, setData] = useState([]);

    const { page } = useScroll();

    useEffect(() => {
        setLoading(true);
        const getCollections = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const collections = await getUserCollections(unsplash, token, {
                    userName: userName,
                    page: checkScroll ? page.current : pageInput,
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
    }, [page.current]);

    useEffect(() => {
        if (checkScroll) {
            if (page.current === 1 || data.length === 0) {
                setData(collections.results);
            } else {
                const newCollections = collections.results.filter(
                    (collection) => !data.some((p) => p.id === collection.id),
                );
                setData((prevCollection) => [...prevCollection, ...newCollections]);
            }
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
