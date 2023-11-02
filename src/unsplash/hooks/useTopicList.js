import { useEffect, useState } from 'react';
import unsplash from '..';
import { ListTopicParams } from '../params/topic';

function useTopicList(topicInput = ListTopicParams) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const get = () => {
        if (loading) return;
        setLoading(true);

        unsplash.topic
            .list({
                ...ListTopicParams,
                ...topicInput,
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.log(' Topic List Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (!topicInput.ids || data?.slug !== topicInput.ids) {
            get();
        }
    }, [topicInput.page, topicInput.ids]);

    return { data, loading, error };
}

export default useTopicList;
