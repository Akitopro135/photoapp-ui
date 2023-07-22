import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { useDebounce } from '~/hooks';
import { SearchIcon } from '~/components/Icons';
import { useState, useEffect } from 'react';
import { createApi } from 'unsplash-js';
import { Link } from 'react-router-dom';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const Search = () => {
    const [value, setValue] = useState('');

    const handleLink = () => {
        if (value.trim()) {
            return config.routes.search(`${value}`);
        } else {
            return config.routes.home;
        }
    };

    return (
        <div className={cx('search')}>
            <input
                value={value}
                placeholder="Search..."
                spellCheck="false"
                onChange={(e) => setValue(e.target.value)}
            />
            <Link to={handleLink()} className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                <SearchIcon />
            </Link>
        </div>
    );
};

export default Search;
