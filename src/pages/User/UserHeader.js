import classNames from 'classnames/bind';
import styles from './UserHeader.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';
import { CollectionIcon, Heart, ImageIcon } from '~/components/Icons';
import { formatNumber } from '~/helpers';

const cx = classNames.bind(styles);

function UserHeader({ user, activeTab, handleTabChange, check }) {
    return (
        <div className={cx('content-header')}>
            <Link
                to={config.routes.user({ userName: check ? `me` : `${user.username}`, value: 'photos' })}
                className={cx('photos-icon', activeTab === 'photos' ? 'active' : '')}
                onClick={() => activeTab !== 'photos' && handleTabChange('photos')}
            >
                <ImageIcon />
                <span>Photos {formatNumber(user.total_photos)}</span>
            </Link>
            <Link
                to={config.routes.user({ userName: check ? `me` : `${user.username}`, value: 'likes' })}
                className={cx('likes-icon', activeTab === 'likes' ? 'active' : '')}
                onClick={() => activeTab !== 'likes' && handleTabChange('likes')}
            >
                <Heart />
                <span>Likes {formatNumber(user.total_likes)}</span>
            </Link>
            <Link
                to={config.routes.user({ userName: check ? `me` : `${user.username}`, value: 'collections' })}
                className={cx('collections-icon', activeTab === 'collections' ? 'active' : '')}
                onClick={() => activeTab !== 'collections' && handleTabChange('collections')}
            >
                <CollectionIcon />
                <span>Collections {formatNumber(user.total_collections)}</span>
            </Link>
        </div>
    );
}

export default UserHeader;
