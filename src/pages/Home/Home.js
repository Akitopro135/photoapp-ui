import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import ListPhoto from './ListPhoto';
import { useSearch, useRandomPhoto, useList, useCollections } from '~/unsplash/hooks';
import { CollectionCard } from '~/components/CollectionCard';
import { PhotoItem } from '~/components/PhotoItem';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
const random = Math.floor(Math.random() * 20) + 1;

function Home() {
    //Lay listSea
    const { data: listSea } = useSearch({
        query: 'sea',
        page: random,
        per_page: 6,
    });

    //Lay listTop
    const { data: listTop } = useList({
        page: random,
        per_page: 6,
    });

    //Lay anh Random
    const { data: photo } = useRandomPhoto({
        query: 'camera',
        per_page: 1,
    });

    //Lay collection khac
    const { data: collections } = useCollections({
        page: random,
        per_page: 3,
    });

    return (
        <>
            {photo && (
                <div className={cx('wrapper')}>
                    {photo.length > 0 && (
                        <div className={cx('introduct')}>
                            <div className={cx('image')}>
                                <PhotoItem data={photo[0]} hardWidthVW={50} />
                            </div>
                            <div>
                                <span>{photo[0].alt_description.toUpperCase()}</span>
                            </div>
                        </div>
                    )}
                    {listTop.length > 0 && (
                        <ListPhoto data={listTop} className={'home'} title={'Top'} morePhoto={false} />
                    )}
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
            )}
        </>
    );
}

export default Home;
