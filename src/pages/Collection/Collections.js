import classNames from 'classnames/bind';
import styles from './Collections.module.scss';

import { CollectionCard } from '~/components/CollectionCard';
import { useLoadMore } from '~/hooks';
import { useCollections } from '~/unsplash/hooks';

const cx = classNames.bind(styles);

function Collections() {
    //Lấy danh sách search collections
    const { loadMoreData: collections } = useLoadMore({
        checkScroll: true,
        fetchDatas: useCollections,
        fetchDatasProps: {
            per_page: 12,
        },
    });

    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Collections</span>
            <span className={cx('description')}>
                Explore the world through collections of beautiful photos free to use under the
            </span>
            <div className={cx('collections-wrapper')}>
                {collections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </div>
        </div>
    );
}

export default Collections;
