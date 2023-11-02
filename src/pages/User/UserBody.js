import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { PhotoList } from '~/components/PhotoList';
import { CollectionCard } from '~/components/CollectionCard';

const cx = classNames.bind(styles);

function UserBody({ activeTab, loadMoreData, likePhotosData, collectionsData }) {
    return (
        <div className={cx('content-body')}>
            {loadMoreData && activeTab === 'photos' && <PhotoList data={loadMoreData} />}
            {likePhotosData && activeTab === 'likes' && <PhotoList data={likePhotosData} check={'likes'} />}
            {collectionsData &&
                activeTab === 'collections' &&
                collectionsData.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} check={'collections'} />
                ))}
        </div>
    );
}

export default UserBody;
