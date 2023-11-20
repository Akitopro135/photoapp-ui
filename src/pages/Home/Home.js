import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import ListPhoto from './ListPhoto';
import { useSearch, useRandomPhoto, useList, useCollections } from '~/unsplash/hooks';
import { CollectionCard } from '~/components/CollectionCard';
import { PhotoItem } from '~/components/PhotoItem';
import { Loading } from '~/components/Loading';
import { useResize } from '~/hooks';

const cx = classNames.bind(styles);
const random = Math.floor(Math.random() * 20) + 2;

function Home() {
    const { changeStyle } = useResize({ size: 69 });
    //Lay listSea
    const { data: listSea, loading: listSeaLoading } = useSearch({
        query: 'sea',
        page: random,
        per_page: 6,
    });

    //Lay listTop
    const { data: listTop, loading: listTopLoading } = useList({
        page: random,
        per_page: 6,
    });

    //Lay anh Random
    const { data: photo, loading: randomPhotoLoading } = useRandomPhoto({
        query: 'camera',
        per_page: 1,
    });

    //Lay collection khac
    const { data: collections, loading: listCollectionLoading } = useCollections({
        page: random,
        per_page: 3,
    });

    if (listCollectionLoading || listSeaLoading || listTopLoading || randomPhotoLoading || !photo) {
        return <Loading />;
    } else {
        return (
            <div className={cx('wrapper')}>
                {photo && (
                    <div className={cx('introduct', changeStyle && 'introduct-change')}>
                        <div className={cx('image')}>
                            <PhotoItem
                                data={photo}
                                hardWidthVW={changeStyle ? 100 : 50}
                                hardHeightVH={60}
                                className={'home-introduct-image'}
                            />
                        </div>
                        <div>
                            <span>{photo.alt_description.toUpperCase()}</span>
                        </div>
                    </div>
                )}
                {listTop.length > 0 && <ListPhoto data={listTop} className={'home'} title={'Top'} morePhoto={false} />}
                {listSea.results && (
                    <ListPhoto data={listSea.results} className={'search'} title={'Sea'} morePhoto={true} />
                )}
                {collections && (
                    <div className={cx('collection-image')}>
                        <div>
                            <span className={cx('related_collections-title')}>Collection</span>
                        </div>
                        <div className={cx('collection-image-body')}>
                            {collections.map((collection) => (
                                <CollectionCard key={collection.id} collection={collection} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Home;
