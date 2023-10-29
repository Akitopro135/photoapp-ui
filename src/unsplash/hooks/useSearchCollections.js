import { useEffect, useState } from 'react';
import unsplash from '..';
import { ListSearchCollectionParams } from '../params/search';

function useSearchCollections(searchInput = ListSearchCollectionParams) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getList = () => {
        if (loading) return;
        setLoading(true);

        unsplash.search
            .getCollections({
                ...ListSearchCollectionParams,
                ...searchInput,
            })
            .then((data) => setData(data))
            .catch((error) => {
                console.log('Search Page Get Collection Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getList();
    }, [searchInput.page, searchInput.query]);

    return { data, loading, error };
}

export default useSearchCollections;
