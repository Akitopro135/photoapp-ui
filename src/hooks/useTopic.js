import { useEffect, useState } from 'react';
import requestKey from '~/utils/request';

function useTopic({ topicIdOrSlug, check }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading || check === undefined) return;
        setLoading(true);
        const get = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const data = await unsplash.topics.get({ topicIdOrSlug });

                setData(data.response);
            } catch (error) {
                console.log('TopicPage Error: ' + error.message);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        get();
    }, [topicIdOrSlug]);

    return { data, loading, error };
}

export default useTopic;
