import { useEffect, useState } from 'react';
import unsplash from '..';
import { ListUserCollectionParams } from '../params/users';

function useUserCollection(userInput = ListUserCollectionParams) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getCollections = () => {
        if (loading) return;
        setLoading(true);

        unsplash.user
            .listCollections({
                ...ListUserCollectionParams,
                ...userInput,
            })
            .then((data) => setData(data))
            .catch((error) => {
                console.log('User Page List Collection Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (userInput.username && userInput.username !== data?.username) {
            getCollections();
        }
    }, [userInput.page, userInput.username]);

    return {
        data,
        loading,
        error,
    };
}

export default useUserCollection;
