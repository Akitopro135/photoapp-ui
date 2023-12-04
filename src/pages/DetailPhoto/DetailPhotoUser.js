import classNames from 'classnames/bind';
import styles from './DetailPhotoUser.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';
import { Download, Heart, PlusIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function DetailPhotoUser({ photo, handleLike, handleOpenPopup }) {
    return (
        <div className={cx('detail-header')}>
            <Link
                to={config.routes.user({ userName: photo.user.username, value: `user` })}
                className={cx('detail-header-user')}
            >
                <img src={photo.user.profile_image.medium} className={cx('profile-image')} alt="" />
                <span>{photo.user.name}</span>
            </Link>
            <div className={cx('detail-header-actions')}>
                <a href={`https://unsplash.com/photos/${photo.id}/download?force=true`} className={cx('btn-download')}>
                    <Download />
                </a>
                <button className={cx('btn-heart', photo.liked_by_user && 'active')} onClick={handleLike}>
                    <Heart />
                </button>
                <button
                    className={cx('btn-plus', photo.current_user_collections.length > 0 && 'active')}
                    onClick={handleOpenPopup}
                >
                    <PlusIcon />
                </button>
            </div>
        </div>
    );
}

export default DetailPhotoUser;
