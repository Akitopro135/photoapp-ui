import classNames from 'classnames/bind';
import styles from './DetailPhoto.module.scss';
import {
    Aperture,
    Calendar,
    Camera,
    CircleInfo,
    Download,
    Exposure,
    FocalLength,
    Heart,
    Iso,
    LocationDot,
    Share,
} from '~/components/Icons';
import CollectionPhoto from '~/components/CollectionPhoto';
import { usePhoto } from '~/hooks';
import { Link, useParams } from 'react-router-dom';
import config from '~/config';
import PhotoItem from '~/components/PhotoItem';

const cx = classNames.bind(styles);

function DetailPhoto() {
    const params = useParams();
    const id = params.id.slice(0, params.id.length);

    const { photo } = usePhoto({ id });

    return (
        <>
            {photo && (
                <div className={cx('detail-wrapper')}>
                    <div className={cx('detail-header')}>
                        <Link to={config.routes.user(photo.user.username)} className={cx('detail-header-user')}>
                            <img src={photo.user.profile_image.medium} className={cx('profile-image')} alt="" />
                            <span>{photo.user.name}</span>
                        </Link>
                        <div className={cx('detail-header-actions')}>
                            <button className={cx('btn-download')}>
                                <Download />
                            </button>
                            <button className={cx('btn-heart')}>
                                <Heart />
                            </button>
                        </div>
                    </div>
                    <div className={cx('detail-content')}>
                        <div className={cx('content-photo')}>
                            <PhotoItem data={photo} width={900} />
                        </div>
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
                                    <button key={tag.title}>{tag.title}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={cx('detail-related-photos')}>
                        <span>Related Photos</span>
                        <div className={cx('related-photos')}>
                            {photo.related_collections.results.map((collection) =>
                                collection.preview_photos.map((photo) => (
                                    <Link key={photo.id} to={config.routes.detailPhoto(`${photo.id}`)}>
                                        <PhotoItem
                                            data={photo}
                                            hardWidthVW={25}
                                            hardHeightVH={30}
                                            className={'related-photos'}
                                        />
                                    </Link>
                                )),
                            )}
                        </div>
                    </div>
                    <div className={cx('detail-related-collections')}>
                        <span>Related Collections</span>
                        <div className={cx('related-collections')}>
                            {photo.related_collections.results.map((collection) => (
                                <Link
                                    key={collection.id}
                                    to={config.routes.collection(`${collection.id}`)}
                                    className={cx('collection')}
                                >
                                    <span>{collection.title}</span>
                                    <span>number of photos: {collection.total_photos}</span>
                                    <CollectionPhoto data={collection.preview_photos} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DetailPhoto;
