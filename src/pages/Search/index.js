import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import PhotoCard from '~/components/PhotoCard';
import { useSearch } from '~/hooks';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { CollectionIcon, Heart, ImageIcon } from '~/components/Icons';
import useSearchUsers from '~/hooks/useSearchUsers';
import useSearchCollections from '~/hooks/useSearchCollections';
import CollectionCard from '~/components/CollectionCard';
import UserCard from '~/components/UserCard';

const cx = classNames.bind(styles);

function Search() {
    const params = useParams();
    const searchValue = params.searchId.slice(0, params.searchId.length);

    const [isPhotosActive, setCheckPhostos] = useState(true);
    const [isUsersActive, setCheckUsers] = useState(false);
    const [isCollectionsActive, setCheckCollections] = useState(false);

    const handlePhotosChange = () => {
        setCheckPhostos(true);
        setCheckUsers(false);
        setCheckCollections(false);
    };

    const handleUsersChange = () => {
        setCheckPhostos(false);
        setCheckUsers(true);
        setCheckCollections(false);
    };

    const handleCollectionsChange = () => {
        setCheckPhostos(false);
        setCheckUsers(false);
        setCheckCollections(true);
    };

    //Lấy danh sách search photos
    const { data, listPhoto } = useSearch({
        checkScroll: true,
        query: searchValue,
        perPage: 12,
    });

    //Lấy danh sách search users
    const { data: usersData, users } = useSearchUsers({
        checkScroll: true,
        query: searchValue,
        perPage: 12,
    });

    //Lấy danh sách search collections
    const { data: collectionsData, collections } = useSearchCollections({
        checkScroll: true,
        query: searchValue,
        perPage: 12,
    });

    const handleChange = (number) => {
        if (number >= 1000 && number < 1000000) {
            return (number / 1000).toFixed(0) + 'k';
        } else {
            return number.toString();
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-header')}>
                <div
                    className={cx('photos-icon', isPhotosActive ? 'active' : '')}
                    onClick={() => !isPhotosActive && handlePhotosChange()}
                >
                    <ImageIcon />
                    <span>Photos {handleChange(parseInt(listPhoto.total))}</span>
                </div>
                <div
                    className={cx('likes-icon', isUsersActive ? 'active' : '')}
                    onClick={() => !isUsersActive && handleUsersChange()}
                >
                    <Heart />
                    <span>Users {handleChange(parseInt(users.total))}</span>
                </div>
                <div
                    className={cx('collections-icon', isCollectionsActive ? 'active' : '')}
                    onClick={() => !isCollectionsActive && handleCollectionsChange()}
                >
                    <CollectionIcon />
                    <span>Collections {handleChange(parseInt(collections.total))}</span>
                </div>
            </div>
            <h1 className={cx('search-value')}>{searchValue}</h1>
            <div className={cx('content-body')}>
                {data &&
                    isPhotosActive &&
                    data.map((photo) => (
                        <PhotoCard
                            key={photo.id}
                            data={photo}
                            className={'search'}
                            card
                            info
                            button
                            profileImage
                            popUp
                        />
                    ))}
                {usersData && isUsersActive && usersData.map((photo) => <UserCard key={photo.id} data={photo} />)}
                {collectionsData &&
                    isCollectionsActive &&
                    collectionsData.map((collection) => <CollectionCard key={collection.id} collection={collection} />)}
            </div>
        </div>
    );
}

export default Search;
