import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import ListPhoto from './ListPhoto';
import { PhotoItem } from '~/components/PhotoItem';
import { useSearch, useRandomPhoto, useList, useCollections } from '~/hooks';
import { CollectionCard } from '~/components/CollectionCard';

const cx = classNames.bind(styles);
const random = Math.floor(Math.random() * 20) + 1;

function Home() {
    //Lay listSea
    const { data: listSea } = useSearch({
        query: 'sea',
        page: random,
        perPage: 6,
    });

    //Lay listTop
    const { data: listTop } = useList({
        page: random,
        perPage: 6,
    });

    //Lay anh Random
    const { data: photo } = useRandomPhoto();

    //Lay collection khac
    const { data: collections } = useCollections({
        page: random,
        perPage: 3,
    });

    return (
        <div className={cx('wrapper')}>
            {photo && (
                <div className={cx('introduct')}>
                    <div className={cx('image')}>
                        <PhotoItem data={photo} width={800} />
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
                        {collections.results.map((collection) => (
                            <CollectionCard key={collection.id} collection={collection} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
