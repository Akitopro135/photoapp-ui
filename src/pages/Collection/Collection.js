import classNames from 'classnames/bind';
import styles from './Collection.module.scss';
import config from '~/config';

import { Link, useParams } from 'react-router-dom';
import { useCollectionInfo, useCollectionPhotos, useCollections } from '~/unsplash/hooks';
import { useLoadMore } from '~/hooks';

import { CollectionPhoto } from '~/components/CollectionPhoto';
import { PhotoList } from '~/components/PhotoList';
import { Loading } from '~/components/Loading';

const cx = classNames.bind(styles);

function Collection() {
    const params = useParams();
    const id = params.id.slice(0, params.id.length);

    const { loadMoreData: data, loading: morePhotoLoading } = useLoadMore({
        checkScroll: true,
        fetchDatas: useCollectionPhotos,
        fetchDatasProps: { id, per_page: 12 },
    });

    //Lay collection khac
    const { data: collections, loading: collectionsLoading } = useCollections({
        page: 2,
        per_page: 3,
    });

    //Lay thong tin cua collection
    const { data: collectionInfo, loading: collectionInfoLoading } = useCollectionInfo({ id });

    //console.log(data);

    if (collectionsLoading || collectionInfoLoading || !collectionInfo || !data || !collections) {
        return <Loading />;
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h1> {collectionInfo.title}</h1>
                <div className={cx('info')}>
                    <img src={collectionInfo.user.profile_image.medium} className={cx('profile-image')} alt="" />
                    <span>{collectionInfo.user.name}</span>
                </div>
            </div>
            <div className={cx('photos-wrapper')}>
                <span>Photos: {collectionInfo.total_photos}</span>
                <div className={cx('photos')}>
                    <PhotoList data={data} />
                </div>
            </div>
            {morePhotoLoading && <Loading />}
            <div className={cx('collections-wrapper')}>
                <span>Collections</span>
                <div className={cx('collections')}>
                    {collections.map((collection) => (
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
    );
}

export default Collection;
