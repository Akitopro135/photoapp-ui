import classNames from 'classnames/bind';
import styles from './User.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';
import { CollectionIcon, Heart, ImageIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function UserHeader({ userName, activeTab, handleTabChange, total, totalLike, totalCollection }) {
    return (
        <div className={cx('content-header')}>
            <Link
                to={config.routes.user({ userName: `${userName}`, value: 'photos' })}
                className={cx('photos-icon', activeTab === 'photos' ? 'active' : '')}
                onClick={() => activeTab !== 'photos' && handleTabChange('photos')}
            >
                <ImageIcon />
                <span>Photos {total}</span>
            </Link>
            <Link
                to={config.routes.user({ userName: `${userName}`, value: 'likes' })}
                className={cx('likes-icon', activeTab === 'likes' ? 'active' : '')}
                onClick={() => activeTab !== 'likes' && handleTabChange('likes')}
            >
                <Heart />
                <span>Likes {totalLike}</span>
            </Link>
            <Link
                to={config.routes.user({ userName: `${userName}`, value: 'collections' })}
                className={cx('collections-icon', activeTab === 'collections' ? 'active' : '')}
                onClick={() => activeTab !== 'collections' && handleTabChange('collections')}
            >
                <CollectionIcon />
                <span>Collections {totalCollection}</span>
            </Link>
        </div>
    );
}

export default UserHeader;
