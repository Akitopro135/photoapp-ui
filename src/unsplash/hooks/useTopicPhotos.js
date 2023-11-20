import { useEffect, useState } from 'react';
import unsplash from '..';
import { ListTopicPhotoParams } from '../params/topic';

function useTopicPhotos(topicInput = ListTopicPhotoParams) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const get = () => {
        if (loading) return;
        setLoading(true);

        unsplash.topic
            .getPhotos({
                ...ListTopicPhotoParams,
                ...topicInput,
            })
            .then((data) => setData(data))
            .catch((error) => {
                console.log(' Topic Photos Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        //if (topicInput.id_or_slug && data?.slug !== topicInput.id_or_slug) {
        get();
        //}
    }, [topicInput.page, topicInput.id_or_slug]);

    return { data, loading, error };
}

export default useTopicPhotos;
