import { useEffect, useState } from 'react';
import unsplash from '..';

function useTopic({ id_or_slug, check }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const get = () => {
        if (loading || check === undefined) return;
        setLoading(true);

        unsplash.topic
            .get(id_or_slug)
            .then((data) => setData(data))
            .catch((error) => {
                console.log(' Topic Get Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (id_or_slug && data?.slug !== id_or_slug) {
            get();
        }
    }, [id_or_slug]);

    return { data, loading, error };
}

export default useTopic;
