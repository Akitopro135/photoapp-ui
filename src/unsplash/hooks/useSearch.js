import { useState, useEffect } from 'react';
import unsplash from '..';
import { ListSearchPhotoParams } from '../params/search';

function useSearch(searchInput = ListSearchPhotoParams) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getList = () => {
        if (loading || searchInput.query === '') return;
        setLoading(true);
        unsplash.search
            .getPhotos({
                ...ListSearchPhotoParams,
                ...searchInput,
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.log('SearchPage Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (searchInput.query && searchInput.query !== data?.query) {
            getList();
        }
    }, [searchInput.page, searchInput.query]);

    return {
        data,
        loading,
        error,
    };
}

export default useSearch;
