import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { SearchIcon } from '~/components/Icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Search() {
    const [value, setValue] = useState('');

    const handleLink = () => {
        if (value.trim()) {
            return config.routes.search(`${value}`);
        } else {
            return config.routes.home;
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Ngăn chặn hành động mặc định của phím Enter
            e.preventDefault();
            // Chuyển hướng đến đường dẫn cần thiết
            const link = handleLink();
            window.location.href = link;
        }
    };

    return (
        <div className={cx('search')}>
            <input
                value={value}
                placeholder="Search..."
                spellCheck="false"
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <Link to={handleLink()} className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                <SearchIcon />
            </Link>
        </div>
    );
}

export default Search;
