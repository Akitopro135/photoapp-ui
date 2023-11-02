import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { PhotoCard } from '~/components/PhotoCard';
import { UserCard } from '~/components/UserCard';
import { CollectionCard } from '~/components/CollectionCard';

const cx = classNames.bind(styles);

function SearchBody({ activeTab, data, usersData, collectionsData }) {
    return (
        <div className={cx('content-body')}>
            {data &&
                activeTab === 'photos' &&
                data.map((photo) => (
                    <PhotoCard key={photo.id} data={photo} className={'search'} card info button profileImage popUp />
                ))}
            {usersData &&
                activeTab === 'users' &&
                usersData.map((photo) => <UserCard key={photo.id} data={photo} className={'search-user'} checkPhoto />)}
            {collectionsData &&
                activeTab === 'collections' &&
                collectionsData.map((collection) => <CollectionCard key={collection.id} collection={collection} />)}
        </div>
    );
}

export default SearchBody;
