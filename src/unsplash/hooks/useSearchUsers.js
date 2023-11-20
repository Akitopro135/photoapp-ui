import { useEffect, useState } from 'react';
import unsplash from '..';
import { ListSearchUserParams } from '../params/search';

function useSearchUsers(searchInput = ListSearchUserParams) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getList = () => {
        if (loading) return;
        setLoading(true);

        unsplash.search
            .getUsers({
                ...ListSearchUserParams,
                ...searchInput,
            })
            .then((data) => setData(data))
            .catch((error) => {
                console.log('Search Page Get Users Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getList();
    }, [searchInput.page, searchInput.query]);

    return { data, loading, error };
}

export default useSearchUsers;
