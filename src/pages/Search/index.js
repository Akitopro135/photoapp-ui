import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { useLoadMore, useSearch } from '~/hooks';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CollectionIcon, Heart, ImageIcon } from '~/components/Icons';
import useSearchUsers from '~/hooks/useSearchUsers';
import useSearchCollections from '~/hooks/useSearchCollections';
import CollectionCard from '~/components/CollectionCard';
import UserCard from '~/components/UserCard';
import { PhotoCard } from '~/components/PhotoCard';
import config from '~/config';

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

    useEffect(() => {
        if (params.value === 'users') {
            handleUsersChange();
        } else if (params.value === 'collections') {
            handleCollectionsChange();
        } else {
            handlePhotosChange();
        }
    }, [params]);

    //Lấy danh sách search photos
    const { loadMoreData: data, total } = useLoadMore({
        checkScroll: isPhotosActive ? true : false,
        fetchDatas: useSearch,
        fetchDatasProps: {
            query: searchValue,
            perPage: 12,
        },
    });

    //Lấy danh sách search users
    const { loadMoreData: usersData, total: totalUser } = useLoadMore({
        checkScroll: isUsersActive ? true : false,
        fetchDatas: useSearchUsers,
        fetchDatasProps: {
            query: searchValue,
            perPage: 12,
        },
    });

    //Lấy danh sách search collections
    const { loadMoreData: collectionsData, total: totalCollection } = useLoadMore({
        checkScroll: isCollectionsActive ? true : false,
        fetchDatas: useSearchCollections,
        fetchDatasProps: {
            query: searchValue,
            perPage: 12,
        },
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
                <Link
                    to={config.routes.search({ searchId: searchValue, value: 'photos' })}
                    className={cx('photos-icon', isPhotosActive ? 'active' : '')}
                    onClick={() => !isPhotosActive && handlePhotosChange()}
                >
                    <ImageIcon />
                    <span>Photos {handleChange(parseInt(total))}</span>
                </Link>
                <Link
                    to={config.routes.search({ searchId: searchValue, value: 'users' })}
                    className={cx('users-icon', isUsersActive ? 'active' : '')}
                    onClick={() => !isUsersActive && handleUsersChange()}
                >
                    <Heart />
                    <span>Users {handleChange(parseInt(totalUser))}</span>
                </Link>
                <Link
                    to={config.routes.search({ searchId: searchValue, value: 'collections' })}
                    className={cx('collections-icon', isCollectionsActive ? 'active' : '')}
                    onClick={() => !isCollectionsActive && handleCollectionsChange()}
                >
                    <CollectionIcon />
                    <span>Collections {handleChange(parseInt(totalCollection))}</span>
                </Link>
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
                {usersData &&
                    isUsersActive &&
                    usersData.map((photo) => (
                        <UserCard key={photo.id} data={photo} className={'search-user'} checkPhoto />
                    ))}
                {collectionsData &&
                    isCollectionsActive &&
                    collectionsData.map((collection) => <CollectionCard key={collection.id} collection={collection} />)}
            </div>
        </div>
    );
}

export default Search;
