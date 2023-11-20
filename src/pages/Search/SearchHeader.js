import classNames from 'classnames/bind';
import styles from './SearchHeader.module.scss';
import config from '~/config';

import { Link } from 'react-router-dom';
import { CollectionIcon, ImageIcon, UserIcon } from '~/components/Icons';
import { formatNumber } from '~/helpers';

const cx = classNames.bind(styles);

function SearchHeader({ searchValue, activeTab, total, totalUser, totalCollection, handleTabChange }) {
    return (
        <div className={cx('content-header')}>
            <Link
                to={config.routes.search({ searchId: searchValue, value: 'photos' })}
                className={cx('photos-icon', activeTab === 'photos' ? 'active' : '')}
                onClick={() => activeTab !== 'photos' && handleTabChange('photos')}
            >
                <ImageIcon />
                <span>Photos {formatNumber(total)}</span>
            </Link>
            <Link
                to={config.routes.search({ searchId: searchValue, value: 'users' })}
                className={cx('users-icon', activeTab === 'users' ? 'active' : '')}
                onClick={() => activeTab !== 'users' && handleTabChange('users')}
            >
                <UserIcon />
                <span>Users {formatNumber(totalUser)}</span>
            </Link>
            <Link
                to={config.routes.search({ searchId: searchValue, value: 'collections' })}
                className={cx('collections-icon', activeTab === 'collections' ? 'active' : '')}
                onClick={() => activeTab !== 'collections' && handleTabChange('collections')}
            >
                <CollectionIcon />
                <span>Collections {formatNumber(totalCollection)}</span>
            </Link>
        </div>
    );
}

export default SearchHeader;
