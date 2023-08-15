import { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import { useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function SearchTest() {
    const [list, setList] = useState([]);

    const params = useParams();

    const search = params.searchTestId.slice(0, params.searchTestId.length);

    const unsplash = createApi({
        accessKey: 't7QEW3RgnoVp2t47HdPBTIS9_7dqkqEYrljiycAWhVY',
    });

    useEffect(() => {
        if (!search.trim()) {
            setList([]);
            return;
        }
        unsplash.search
            .getPhotos({
                query: { search },
                page: 1,
                perPage: 10,
            })
            .then((result) => {
                if (result.errors) {
                    console.log('error occurred: ', result.errors[0]);
                } else {
                    setList(result.response.results);
                }
            });
    }, [search]);
    return (
        <div className={cx('wrapper')}>
            <h1>Search</h1>
        </div>
    );
}

export default SearchTest;
