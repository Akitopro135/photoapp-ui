import { useEffect, useState } from 'react';
import requestKey from '~/utils/request';

function useTopicPhotos({ topicIdOrSlug, page, orientation, perPage, orderBy }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (loading) return;
        setLoading(true);
        const get = async () => {
            try {
                const { unsplash, token } = await requestKey();

                const photos = await unsplash.topics.getPhotos({
                    topicIdOrSlug,
                    page,
                    perPage,
                    orderBy,
                    orientation,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(photos.response);
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

export default useTopicPhotos;
