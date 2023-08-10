import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailPhoto } from '~/services/searchServices';
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
import PhotoItem from '~/components/PhotoItem';
import CollectionPhoto from '~/components/CollectionPhoto';

const cx = classNames.bind(styles);

function DetailPhoto() {
    const [photo, setPhoto] = useState();

    const params = useParams();
    const id = params.id.slice(0, params.id.length);

    useEffect(() => {
        const fetchApi = async () => {
            const photo = await getDetailPhoto(id);
            console.log(photo);
            setPhoto(photo);
        };

        fetchApi();
    }, []);

    return (
        <>
            {photo && (
                <div className={cx('detail-wrapper')}>
                    <div className={cx('detail-header')}>
                        <div className={cx('detail-header-user')}>
                            <img src={photo.user.profile_image.medium} className={cx('profile-image')} />
                            <span>{photo.user.name}</span>
                        </div>
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
                            <PhotoItem data={photo} popUp />
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
                                <div>
                                    <LocationDot />
                                    <span>{photo.user.location}</span>
                                </div>
                                <div>
                                    <Camera />
                                    <span>{photo.exif.name}</span>
                                </div>
                                <div>
                                    <Calendar />
                                    <span>{new Date(photo.created_at).toDateString()}</span>
                                </div>
                                <div>
                                    <Exposure />
                                    <span>Exposure: {photo.exif.exposure_time}</span>
                                </div>
                                <div>
                                    <Aperture />
                                    <span>Aperture: {photo.exif.aperture}</span>
                                </div>
                                <div>
                                    <FocalLength />
                                    <span>Focal: {photo.exif.focal_length}</span>
                                </div>
                                <div>
                                    <Iso />
                                    <span>Iso: {photo.exif.iso}</span>
                                </div>
                            </div>
                            <div className={cx('detail-tags')}>
                                {photo.tags.map((tag) => (
                                    <button>{tag.title}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={cx('detail-related-collections')}>
                        <span>Related Collections</span>
                        <div className={cx('related-collections')}>
                            {photo.related_collections.results.map((collection) => (
                                <div className={cx('collection')}>
                                    <span>{collection.cover_photo.alt_description}</span>
                                    <span>number of photos: {collection.total_photos}</span>
                                    <CollectionPhoto data={collection.preview_photos} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DetailPhoto;
