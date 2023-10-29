import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { useParams } from 'react-router-dom';
import { useUser, useUserPhotos, useUserCollection, useUserLike } from '~/unsplash/hooks';
import { useLoadMore } from '~/hooks';

import { useEffect, useState } from 'react';
import UserInfo from './UserInfo';
import UserHeader from './UserHeader';
import UserBody from './UserBody';
import unsplash from '~/unsplash';

const cx = classNames.bind(styles);

function User() {
    const params = useParams();
    const userName = params.username.slice(0, params.username.length);

    // const itemKeep = document.getElementsByClassName(cx('content-header'));
    // const wrapperOfItem = document.getElementsByClassName(cx('content-wrapper'));
    // const spaceBetweenItemAndSidebar = document.getElementsByClassName(cx('title'));

    // useHeaderScroll({
    //     wrapperOfItem: wrapperOfItem,
    //     itemKeep: itemKeep,
    //     spaceBetweenItemAndSidebar: spaceBetweenItemAndSidebar,
    // });

    const [activeTab, setActiveTab] = useState('photos');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0 });
    };

    useEffect(() => {
        if (params.value === 'likes') {
            handleTabChange('likes');
        } else if (params.value === 'collections') {
            handleTabChange('collections');
        } else if (params.value === 'stats') {
            handleTabChange('stats');
        } else {
            handleTabChange('photos');
        }
    }, [params]);

    //Lấy thông tin user
    const { data: user } = useUser({
        username: params.username === 'me' ? localStorage.getItem('currentId') : userName,
    });

    //Lấy list photos có scroll để load thêm photos
    const { loadMoreData } = useLoadMore({
        checkScroll: activeTab === 'photos' ? true : false,
        fetchDatas: useUserPhotos,
        fetchDatasProps: {
            username: params.username === 'me' ? localStorage.getItem('currentId') : userName,
            per_page: 12,
        },
    });

    //Lấy list collection có scroll để load thêm collections
    const { loadMoreData: collectionsData } = useLoadMore({
        checkScroll: activeTab === 'collections' ? true : false,
        fetchDatas: useUserCollection,
        fetchDatasProps: {
            username: params.username === 'me' ? localStorage.getItem('currentId') : userName,
        },
    });

    //Lấy list photos like có scroll để load thêm photos like
    const { loadMoreData: likePhotosData } = useLoadMore({
        checkScroll: activeTab === 'likes' ? true : false,
        fetchDatas: useUserLike,
        fetchDatasProps: {
            username: params.username === 'me' ? localStorage.getItem('currentId') : userName,
            per_page: 12,
        },
    });

    return (
        <>
            {user && (
                <div className={cx('wrapper')}>
                    <UserInfo user={user} />
                    <div className={cx('content-wrapper')}>
                        <UserHeader
                            user={user}
                            activeTab={activeTab}
                            handleTabChange={handleTabChange}
                            check={params.username === 'me' ? true : false}
                        />
                        <UserBody
                            activeTab={activeTab}
                            loadMoreData={loadMoreData}
                            likePhotosData={likePhotosData}
                            collectionsData={collectionsData}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default User;
