import classNames from 'classnames/bind';
import styles from './Collection.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useCollectionInfo, useCollectionPhotos, useCollections, useScroll } from '~/hooks';
import PhotoItem from '~/components/PhotoItem';
import config from '~/config';
import CollectionPhoto from '~/components/CollectionPhoto';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Collection() {
    const params = useParams();
    const id = params.id.slice(0, params.id.length);

    const [data, setData] = useState([]);

    const { page } = useScroll();

    const { photos } = useCollectionPhotos({
        id,
        page: page.current,
        perPage: 12,
    });

    useEffect(() => {
        if (page.current === 1 || data.length === 0) {
            setData(photos.results);
        } else {
            const newPhotos = photos.results.filter((photo) => !data.some((p) => p.id === photo.id));
            setData((prevPhotos) => [...prevPhotos, ...newPhotos]);
        }
    }, [photos.results]);

    //Lay collection khac
    const { collections } = useCollections({
        page: 2,
        perPage: 3,
    });

    //Lay thong tin cua collection
    const { collectionInfo } = useCollectionInfo({ id });

    return (
        <>
            {collectionInfo && data && photos && collections && (
                <div className={cx('wrapper')}>
                    <div className={cx('title')}>
                        <h1>{collectionInfo.title}</h1>
                        <div className={cx('info')}>
                            <img
                                src={collectionInfo.user.profile_image.medium}
                                className={cx('profile-image')}
                                alt=""
                            />
                            <span>{collectionInfo.user.name}</span>
                        </div>
                    </div>
                    {data.length > 0 && (
                        <div className={cx('photos-wrapper')}>
                            <span>Photos: {photos.total}</span>
                            <div className={cx('photos')}>
                                {data.map((photo) => (
                                    <Link key={photo.id} to={config.routes.detailPhoto(`${photo.id}`)}>
                                        <PhotoItem
                                            data={photo}
                                            hardWidthVW={25}
                                            hardHeightVH={30}
                                            className={'related-photos'}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className={cx('collections-wrapper')}>
                        <span>Collections</span>
                        <div className={cx('collections')}>
                            {collections.results.map((collection) => (
                                <Link
                                    key={collection.id}
                                    to={config.routes.collection(`${collection.id}`)}
                                    className={cx('collection-info')}
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

export default Collection;
