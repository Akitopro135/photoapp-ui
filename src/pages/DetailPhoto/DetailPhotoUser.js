import classNames from 'classnames/bind';
import styles from './DetailPhoto.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';
import { Download, Heart } from '~/components/Icons';

const cx = classNames.bind(styles);

function DetailPhotoUser({ photo }) {
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
                <a href={photo.links.download} className={cx('btn-download')}>
                    <Download />
                </a>
                <button className={cx('btn-heart')}>
                    <Heart />
                </button>
            </div>
        </div>
    );
}

export default DetailPhotoUser;
