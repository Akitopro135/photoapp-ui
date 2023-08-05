import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { getSearch } from '~/services/searchServices';
import PhotoItem from '~/components/PhotoItem';

const cx = classNames.bind(styles);

function Search() {
    const [list, setList] = useState([]);

    const params = useParams();
    const searchValue = params.searchId.slice(0, params.searchId.length);

    useEffect(() => {
        if (!searchValue.trim()) {
            setList([]);
            return;
        }

        const fetchApi = async () => {
            const result = await getSearch(searchValue, 1, 12, 'popular');
            setList(result);
            console.log(result);
        };

        fetchApi();
    }, [searchValue]);

    return (
        <div className={cx('wrapper')}>
            {list.map((photo) => (
                <PhotoItem key={photo.id} data={photo} classNameImage={'image'} popUp />
            ))}
        </div>
    );
}

export default Search;
