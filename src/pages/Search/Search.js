import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSearch, useSearchUsers, useSearchCollections } from '~/unsplash/hooks';
import { useLoadMore, useResize } from '~/hooks';
import SearchHeader from './SearchHeader';
import SearchBody from './SearchBody';
import { Loading } from '~/components/Loading';

const cx = classNames.bind(styles);

function Search() {
    const params = useParams();
    const searchValue = params.searchId.slice(0, params.searchId.length);

    // const itemKeep = document.getElementsByClassName(cx('content-header'));
    // const wrapperOfItem = document.getElementsByClassName(cx('wrapper'));

    // useHeaderScroll({
    //     wrapperOfItem: wrapperOfItem,
    //     itemKeep: itemKeep,
    // });

    const [activeTab, setActiveTab] = useState('photos');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0 });
    };

    useEffect(() => {
        if (params.value === 'users') {
            handleTabChange('users');
        } else if (params.value === 'collections') {
            handleTabChange('collections');
        } else {
            handleTabChange('photos');
        }
    }, [params]);

    //Lấy danh sách search photos
    const {
        loadMoreData: data,
        loading: photosLoading,
        total,
    } = useLoadMore({
        checkScroll: activeTab === 'photos' ? true : false,
        fetchDatas: useSearch,
        fetchDatasProps: {
            query: searchValue,
            per_page: 12,
        },
    });

    //Lấy danh sách search users
    const {
        loadMoreData: usersData,
        loading: usersLoading,
        total: userTotal,
    } = useLoadMore({
        checkScroll: activeTab === 'users' ? true : false,
        fetchDatas: useSearchUsers,
        fetchDatasProps: {
            query: searchValue,
            per_page: 12,
        },
    });

    //Lấy danh sách search collections
    const {
        loadMoreData: collectionsData,
        loading: collectionsLoading,
        total: collectionTotal,
    } = useLoadMore({
        checkScroll: activeTab === 'collections' ? true : false,
        fetchDatas: useSearchCollections,
        fetchDatasProps: {
            query: searchValue,
            per_page: 12,
        },
    });

    if (!data || !usersData || !collectionsData) {
        return <Loading />;
    }
    return (
        <div className={cx('wrapper')}>
            <SearchHeader
                searchValue={searchValue}
                activeTab={activeTab}
                total={total}
                totalUser={userTotal}
                totalCollection={collectionTotal}
                handleTabChange={handleTabChange}
            />
            <h1 className={cx('search-value')}>{searchValue}</h1>
            <SearchBody
                activeTab={activeTab}
                data={data}
                usersData={usersData}
                collectionsData={collectionsData}
                checkLoading={photosLoading || usersLoading || collectionsLoading}
            />
        </div>
    );
}

export default Search;
