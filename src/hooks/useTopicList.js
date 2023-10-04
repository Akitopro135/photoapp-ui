import { useEffect, useState } from 'react';
import requestKey from '~/utils/request';

function useTopicList({ topicIdOrSlug, page, perPage, orderBy }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        const get = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const data = await unsplash.topics.list({
                    topicIdOrSlug,
                    page,
                    perPage,
                    orderBy,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(data.response);
            } catch (error) {
                console.log('TopicPage Error: ' + error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        get();
    }, [page, topicIdOrSlug]);

    return { data, total: data.total, loading, error };
}

export default useTopicList;
