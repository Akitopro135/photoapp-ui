import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLoadMore, useSearch, useSearchUsers, useSearchCollections } from '~/hooks';
import SearchHeader from './SearchHeader';
import SearchBody from './SearchBody';

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
    const { loadMoreData: data, total } = useLoadMore({
        checkScroll: activeTab === 'photos' ? true : false,
        fetchDatas: useSearch,
        fetchDatasProps: {
            query: searchValue,
            perPage: 12,
        },
    });

    //Lấy danh sách search users
    const { loadMoreData: usersData, total: totalUser } = useLoadMore({
        checkScroll: activeTab === 'users' ? true : false,
        fetchDatas: useSearchUsers,
        fetchDatasProps: {
            query: searchValue,
            perPage: 12,
        },
    });

    //Lấy danh sách search collections
    const { loadMoreData: collectionsData, total: totalCollection } = useLoadMore({
        checkScroll: activeTab === 'collections' ? true : false,
        fetchDatas: useSearchCollections,
        fetchDatasProps: {
            query: searchValue,
            perPage: 12,
        },
    });

    return (
        <div className={cx('wrapper')}>
            <SearchHeader
                searchValue={searchValue}
                activeTab={activeTab}
                total={total}
                totalUser={totalUser}
                totalCollection={totalCollection}
                handleTabChange={handleTabChange}
            />
            <h1 className={cx('search-value')}>{searchValue}</h1>
            <SearchBody activeTab={activeTab} data={data} usersData={usersData} collectionsData={collectionsData} />
        </div>
    );
}

export default Search;
