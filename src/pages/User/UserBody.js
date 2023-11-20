import classNames from 'classnames/bind';
import styles from './UserBody.module.scss';
import { PhotoList } from '~/components/PhotoList';
import { CollectionCard } from '~/components/CollectionCard';
import { Loading } from '~/components/Loading';

const cx = classNames.bind(styles);

function UserBody({ activeTab, loadMoreData, likePhotosData, collectionsData, checkLoading }) {
    return (
        <div className={cx('content-body')}>
            {loadMoreData && activeTab === 'photos' && <PhotoList data={loadMoreData} />}
            {likePhotosData && activeTab === 'likes' && <PhotoList data={likePhotosData} check={'likes'} />}
            {collectionsData &&
                activeTab === 'collections' &&
                collectionsData.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} check={'collections'} />
                ))}
            {checkLoading && <Loading />}
        </div>
    );
}

export default UserBody;
