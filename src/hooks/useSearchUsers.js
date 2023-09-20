import { useEffect, useState } from 'react';
import { getSearchUser } from '~/services';
import requestKey from '~/utils/request';
import useScroll from './useScroll';

function useSearchUsers({ query, pageInput, perPage, checkScroll = false }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [data, setData] = useState([]);

    const { page, setPage } = useScroll({ checkScroll });

    useEffect(() => {
        setData([]);
        setPage(1);
    }, [query]);

    useEffect(() => {
        if (loading) {
            return;
        }
        setLoading(true);
        const getList = async () => {
            try {
                const { unsplash, token } = requestKey();

                const users = await getSearchUser(unsplash, token, {
                    query,
                    page: checkScroll ? page : pageInput,
                    perPage,
                });

                setUsers(users);
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
            setData(users.results);
        } else if (checkScroll) {
            const newUsers = users.results.filter((user) => !data.some((p) => p.id === user.id));
            setData((prevUsers) => [...prevUsers, ...newUsers]);
        }
    }, [users.results]);

    return { data, users, loading, error };
}

export default useSearchUsers;
