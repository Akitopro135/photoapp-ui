import { useEffect, useState } from 'react';
import useScroll from './useScroll';

function useLoadMore({ checkScroll = false, fetchDatas, fetchDatasProps }) {
    const [loadMoreData, setData] = useState([]);
    const { page, setPage } = useScroll({ checkScroll });

    useEffect(() => {
        setPage(1);
        setData([]);
    }, [fetchDatasProps.id, fetchDatasProps.username, fetchDatasProps.query, fetchDatasProps.id_or_slug]);

    const { data } = fetchDatas({
        ...fetchDatasProps,
        page,
    });

    useEffect(() => {
        if (data === undefined) return;
        const result = data.results ? data.results : data;
        const loadData = loadMoreData.results ? loadMoreData.results : loadMoreData;
        if (page === 1 || loadMoreData.length === 0) {
            setData(result);
        } else {
            const newDatas = result.filter((data) => !loadData.some((p) => p.id === data.id));
            setData((prevDatas) => [...prevDatas, ...newDatas]);
        }
    }, [data]);

    return {
        loadMoreData,
        total: data?.total || 0,
    };
}

export default useLoadMore;
