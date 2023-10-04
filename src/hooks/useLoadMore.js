import { useEffect, useState } from 'react';
import useScroll from './useScroll';

function useLoadMore({ checkScroll = false, fetchDatas, fetchDatasProps }) {
    const [loadMoreData, setData] = useState([]);
    const { page, setPage } = useScroll({ checkScroll });

    useEffect(() => {
        setData([]);
        setPage(1);
    }, [fetchDatasProps.id, fetchDatasProps.userName, fetchDatasProps.query, fetchDatasProps.topicIdOrSlug]);

    const { data, total } = fetchDatas({
        ...fetchDatasProps,
        page,
    });

    useEffect(() => {
        if (page === 1 || loadMoreData.length === 0) {
            setData(data.results);
        } else {
            const newDatas = data.results.filter((data) => !loadMoreData.some((p) => p.id === data.id));
            setData((prevDatas) => [...prevDatas, ...newDatas]);
        }
    }, [data.results]);

    return {
        total,
        loadMoreData,
    };
}

export default useLoadMore;
