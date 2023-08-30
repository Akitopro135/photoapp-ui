import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import PhotoItem from '~/components/PhotoItem';
import CollectionPhoto from '~/components/CollectionPhoto';
import ListPhoto from './ListPhoto';
import { useSearch, useRandomPhoto, useList, useCollections } from '~/hooks';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);
const random = Math.floor(Math.random() * 20) - 1;

function Home() {
    //Lay listSea
    const { listPhoto: listSea } = useSearch({
        query: 'sea',
        page: random,
        perPage: 6,
    });

    //Lay listTop
    const { listPhoto: listTop } = useList({
        page: random,
        perPage: 6,
    });

    //Lay anh Random
    const { photo } = useRandomPhoto();

    //Lay collection khac
    const { collections } = useCollections({
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
            {listSea.length > 0 && <ListPhoto data={listSea} className={'search'} title={'Sea'} morePhoto={true} />}
            {listSea.length > 0 && (
                <div className={cx('collection-image')}>
                    <div>
                        <span>Collection</span>
                    </div>
                    {collections && (
                        <div className={cx('collection-image-body')}>
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
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
