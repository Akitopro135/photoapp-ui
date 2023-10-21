import classNames from 'classnames/bind';
import styles from './User.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';
import { CollectionIcon, Heart, ImageIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function UserHeader({ user, activeTab, handleTabChange }) {
    return (
        <div className={cx('content-header')}>
            <Link
                to={config.routes.user({ userName: `${user.username}`, value: 'photos' })}
                className={cx('photos-icon', activeTab === 'photos' ? 'active' : '')}
                onClick={() => activeTab !== 'photos' && handleTabChange('photos')}
            >
                <ImageIcon />
                <span>Photos {user.total_photos}</span>
            </Link>
            <Link
                to={config.routes.user({ userName: `${user.username}`, value: 'likes' })}
                className={cx('likes-icon', activeTab === 'likes' ? 'active' : '')}
                onClick={() => activeTab !== 'likes' && handleTabChange('likes')}
            >
                <Heart />
                <span>Likes {user.total_likes}</span>
            </Link>
            <Link
                to={config.routes.user({ userName: `${user.username}`, value: 'collections' })}
                className={cx('collections-icon', activeTab === 'collections' ? 'active' : '')}
                onClick={() => activeTab !== 'collections' && handleTabChange('collections')}
            >
                <CollectionIcon />
                <span>Collections {user.total_collections}</span>
            </Link>
        </div>
    );
}

export default UserHeader;
