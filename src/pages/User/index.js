import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useLoadMore, useUser, useUserPhotos } from '~/hooks';
import {
    CollectionIcon,
    Heart,
    ImageIcon,
    InstagramIcon,
    LinkIcon,
    LocationDot,
    TwitterIcon,
} from '~/components/Icons';

import { useEffect, useState } from 'react';
import config from '~/config';
import useUserCollection from '~/hooks/useUserCollections';
import CollectionCard from '~/components/CollectionCard';
import useUserLike from '~/hooks/useUserLikes';
import PhotoList from '~/components/PhotoList';

const cx = classNames.bind(styles);

function User() {
    const params = useParams();
    const userName = params.username.slice(0, params.username.length);

    const [isPhotosActive, setCheckPhostos] = useState(true);
    const [isLikesActive, setCheckLikes] = useState(false);
    const [isCollectionsActive, setCheckCollections] = useState(false);

    const handlePhotosChange = () => {
        setCheckPhostos(true);
        setCheckLikes(false);
        setCheckCollections(false);
    };

    const handleLikesChange = () => {
        setCheckPhostos(false);
        setCheckLikes(true);
        setCheckCollections(false);
    };

    const handleCollectionsChange = () => {
        setCheckPhostos(false);
        setCheckLikes(false);
        setCheckCollections(true);
    };

    useEffect(() => {
        if (params.value === 'likes') {
            handleLikesChange();
        } else if (params.value === 'collections') {
            handleCollectionsChange();
        } else {
            handlePhotosChange();
        }
    }, [params]);

    //Lấy thông tin user
    const { data: user } = useUser({
        username: userName,
    });

    //Lấy list photos có scroll để load thêm photos
    const { loadMoreData, total } = useLoadMore({
        checkScroll: isPhotosActive ? true : false,
        fetchDatas: useUserPhotos,
        fetchDatasProps: {
            userName,
            perPage: 12,
        },
    });

    //Lấy list collection có scroll để load thêm collections
    const { loadMoreData: collectionsData, total: totalCollection } = useLoadMore({
        checkScroll: isCollectionsActive ? true : false,
        fetchDatas: useUserCollection,
        fetchDatasProps: {
            userName,
        },
    });

    //Lấy list photos like có scroll để load thêm photos like
    const { loadMoreData: likePhotosData, total: totalLike } = useLoadMore({
        checkScroll: isLikesActive ? true : false,
        fetchDatas: useUserLike,
        fetchDatasProps: {
            userName,
            perPage: 12,
        },
    });

    return (
        <>
            {user && (
                <div className={cx('wrapper')}>
                    <div className={cx('title')}>
                        <div className={cx('image')}>
                            <img src={user.profile_image.large} className={cx('profile-image')} alt="" />
                        </div>
                        <div className={cx('info')}>
                            <span className={cx('username')}>{user.username}</span>
                            <span className={cx('bio')}>{user.bio}</span>
                            {user.location && (
                                <div>
                                    <Link
                                        to={config.routes.search({ searchId: user.location, value: 'photos' })}
                                        className={cx('location-icon')}
                                        onClick={() => window.scrollTo({ top: 0 })}
                                    >
                                        <LocationDot />
                                        <span>{user.location}</span>
                                    </Link>
                                </div>
                            )}
                            {user.social.instagram_username && (
                                <a
                                    href={`https://www.instagram.com/${user.social.instagram_username}`}
                                    className={cx('connect-icon')}
                                >
                                    <InstagramIcon />
                                    <span>Instagram</span>
                                </a>
                            )}
                            {user.social.twitter_username && (
                                <a
                                    href={`https://www.twitter.com/${user.social.twitter_username}`}
                                    className={cx('connect-icon')}
                                >
                                    <TwitterIcon />
                                    <span>Twitter</span>
                                </a>
                            )}

                            {user.social.portfolio_url && (
                                <a href={`http://www.neom.com`} className={cx('connect-icon')}>
                                    <LinkIcon />
                                    <span>
                                        {user.social.portfolio_url.substring(
                                            user.social.portfolio_url.indexOf('www.') + 4,
                                        )}
                                    </span>
                                </a>
                            )}
                            <div className={cx('info-tap')}>
                                <span>Interests</span>
                                <div className={cx('detail-tags')}>
                                    {user.tags.custom.map((tag) => (
                                        <Link
                                            to={config.routes.search({ searchId: tag.title, value: 'photos' })}
                                            key={tag.title}
                                            className={cx('tags')}
                                            onClick={() => window.scrollTo({ top: 0 })}
                                        >
                                            {tag.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('content-wrapper')}>
                        <div className={cx('content-header')}>
                            <Link
                                to={config.routes.user({ userName: `${userName}`, value: 'user' })}
                                className={cx('photos-icon', isPhotosActive ? 'active' : '')}
                                onClick={() => !isPhotosActive && handlePhotosChange()}
                            >
                                <ImageIcon />
                                <span>Photos {total}</span>
                            </Link>
                            <Link
                                to={config.routes.user({ userName: `${userName}`, value: 'likes' })}
                                className={cx('likes-icon', isLikesActive ? 'active' : '')}
                                onClick={() => !isLikesActive && handleLikesChange()}
                            >
                                <Heart />
                                <span>Likes {totalLike}</span>
                            </Link>
                            <Link
                                to={config.routes.user({ userName: `${userName}`, value: 'collections' })}
                                className={cx('collections-icon', isCollectionsActive ? 'active' : '')}
                                onClick={() => !isCollectionsActive && handleCollectionsChange()}
                            >
                                <CollectionIcon />
                                <span>Collections {totalCollection}</span>
                            </Link>
                        </div>
                        <div className={cx('content-body')}>
                            {loadMoreData && isPhotosActive && (
                                // data.map((photo) => (
                                //     <PhotoHover
                                //         key={photo.id}
                                //         data={photo}
                                //         hardWidthVW={25}
                                //         hardHeightVH={30}
                                //         className={'user-photos'}
                                //     />
                                // ))}
                                <PhotoList data={loadMoreData} widthPC={30} />
                            )}
                            {likePhotosData && isLikesActive && (
                                // likePhotosData.map((photo) => (
                                //     <PhotoHover
                                //         key={photo.id}
                                //         data={photo}
                                //         hardWidthVW={25}
                                //         hardHeightVH={30}
                                //         className={'user-photos'}
                                //     />
                                // ))
                                <PhotoList data={likePhotosData} widthPC={30} check={'likes'} />
                            )}
                            {collectionsData &&
                                isCollectionsActive &&
                                collectionsData.map((collection) => (
                                    <CollectionCard key={collection.id} collection={collection} check={'collections'} />
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default User;
