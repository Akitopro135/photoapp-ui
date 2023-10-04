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
import { usePhoto, useSearch } from '~/hooks';
import { Link, useParams } from 'react-router-dom';
import config from '~/config';
import PhotoItem from '~/components/PhotoItem';
import CollectionCard from '~/components/CollectionCard';
import PhotoList from '~/components/PhotoList';

const cx = classNames.bind(styles);

function DetailPhoto() {
    const params = useParams();
    const id = params.id.slice(0, params.id.length);

    const { data: photo } = usePhoto({ id });

    const { data: listPhoto } = useSearch({
        query: photo ? photo.tags[0].title : '',
        perPage: 12,
    });

    return (
        <>
            {photo && (
                <div className={cx('detail-wrapper')}>
                    <div className={cx('detail-header')}>
                        <Link
                            to={config.routes.user({ userName: photo.user.username, value: `user` })}
                            className={cx('detail-header-user')}
                        >
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
                            <PhotoItem data={photo} widthPC={50} />
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
                    </div>
                    <div className={cx('detail-related-photos')}>
                        <span>Related Photos</span>
                        <div className={cx('related-photos')}>
                            {/* {photo.related_collections.results.map((collection, listIndex) =>
                                collection.preview_photos.map((photo, index) => (
                                    <Link key={photo.id} to={config.routes.detailPhoto(`${photo.id}`)}>
                                        <PhotoItem
                                            data={photo}
                                            hardWidthVW={25}
                                            hardHeightVH={30}
                                            className={'related-photo'}
                                        />
                                    </Link>
                                )),
                            )} */}
                            <PhotoList data={listPhoto.results} widthPC={30} />
                        </div>
                    </div>
                    <div className={cx('detail-related-collections')}>
                        <span className={cx('related_collections-title')}>Related Collections</span>
                        <div className={cx('related-collections')}>
                            {photo.related_collections.results.map((collection) => (
                                <CollectionCard key={collection.id} collection={collection} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DetailPhoto;
