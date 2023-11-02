import classNames from 'classnames/bind';
import styles from './DetailPhoto.module.scss';

import { useParams } from 'react-router-dom';
import { PhotoItem } from '~/components/PhotoItem';
import { CollectionCard } from '~/components/CollectionCard';
import { PhotoList } from '~/components/PhotoList';
import DetailPhotoUser from './DetailPhotoUser';
import DetailPhotoInfo from './DetailPhotoInfo';
import { usePhoto, useSearch } from '~/unsplash/hooks';

const cx = classNames.bind(styles);

function DetailPhoto() {
    const params = useParams();
    const id = params.id.slice(0, params.id.length);

    const { data: photo, like } = usePhoto({ id });

    const { data: listPhoto } = useSearch({
        query: photo ? photo.tags[0].title : '',
        per_page: 12,
    });

    return (
        <>
            {photo && (
                <div className={cx('detail-wrapper')}>
                    <DetailPhotoUser photo={photo} handleLike={like} />
                    <div className={cx('detail-content')}>
                        <div className={cx('content-photo')}>
                            <PhotoItem data={photo} hardWidthVW={50} />
                        </div>
                        <DetailPhotoInfo photo={photo} />
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
                            <PhotoList data={listPhoto.results} />
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
