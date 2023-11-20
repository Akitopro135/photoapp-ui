import classNames from 'classnames/bind';
import styles from './DetailPhotoInfo.module.scss';
import config from '~/config';
import {
    Aperture,
    Calendar,
    Camera,
    CircleInfo,
    Exposure,
    FocalLength,
    Iso,
    LocationDot,
    Share,
} from '~/components/Icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function DetailPhotoInfo({ photo }) {
    return (
        <div className={cx('content-photo-detail')}>
            <div className={cx('detail-view-download')}>
                <div className={cx('info')}>
                    <div className={cx('views')}>
                        <span>Views</span>
                        <span>{photo.views}</span>
                    </div>
                    <div className={cx('downloads')}>
                        <span>Downloads</span>
                        <span>{photo.downloads}</span>
                    </div>
                    <div className={cx('likes')}>
                        <span>Likes</span>
                        <span>{photo.likes}</span>
                    </div>
                </div>
                <div className={cx('actions')}>
                    <button>
                        <Share />
                        <span>Share</span>
                    </button>
                    <button>
                        <CircleInfo />
                        <span>Stats</span>
                    </button>
                </div>
            </div>
            <div className={cx('detail-order')}>
                {photo.user.location && (
                    <div>
                        <LocationDot />
                        <span>{photo.user.location}</span>
                    </div>
                )}
                {photo.exif.name && (
                    <div>
                        <Camera />
                        <span>{photo.exif.name}</span>
                    </div>
                )}
                <div>
                    <Calendar />
                    <span>{new Date(photo.created_at).toDateString()}</span>
                </div>
                {photo.exif.exposure_time && (
                    <div>
                        <Exposure />
                        <span>Exposure: {photo.exif.exposure_time}</span>
                    </div>
                )}
                {photo.exif.aperture && (
                    <div>
                        <Aperture />
                        <span>Aperture: {photo.exif.aperture}</span>
                    </div>
                )}
                {photo.exif.focal_length && (
                    <div>
                        <FocalLength />
                        <span>Focal: {photo.exif.focal_length}</span>
                    </div>
                )}
                {photo.exif.iso && (
                    <div>
                        <Iso />
                        <span>Iso: {photo.exif.iso}</span>
                    </div>
                )}
            </div>
            <div className={cx('detail-tags')}>
                {photo.tags.map((tag) => (
                    <Link
                        to={config.routes.search({ searchId: tag.title, value: 'photos' })}
                        key={tag.title}
                        className={cx('tags')}
                        onClick={() => window.scrollTo({ top: 0 })}
                    >
                        {tag.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default DetailPhotoInfo;
