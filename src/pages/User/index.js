import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useUser, useUserPhotos } from '~/hooks';
import {
    CollectionIcon,
    Heart,
    ImageIcon,
    InstagramIcon,
    LinkIcon,
    LocationDot,
    TwitterIcon,
} from '~/components/Icons';
import 'tippy.js/dist/tippy.css';
import { useState } from 'react';
import config from '~/config';
import useUserCollection from '~/hooks/useUserCollections';
import CollectionCard from '~/components/CollectionCard';
import useUserLike from '~/hooks/useUserLikes';
import { PhotoHover } from '~/components/PhotoCard';
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

    //Lấy thông tin user
    const { user } = useUser({
        username: userName,
    });

    //Lấy list photos có scroll để load thêm photos
    const { photos, data } = useUserPhotos({
        checkScroll: isPhotosActive ? true : false,
        userName: userName,
        perPage: 12,
    });

    //Lấy list collection có scroll để load thêm collections
    const { collections, data: collectionsData } = useUserCollection({
        //checkScroll: isCollectionsActive ? true : false,
        userName: userName,
    });

    //Lấy list photos like có scroll để load thêm photos like
    const { data: likePhotosData, photos: photoLikes } = useUserLike({
        checkScroll: isLikesActive ? true : false,
        userName: userName,
        perPage: 12,
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
                                    <Link to={config.routes.search(`${user.location}`)} className={cx('location-icon')}>
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
                                            to={config.routes.search(`${tag.title}`)}
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
                            <div onClick={() => !isPhotosActive && handlePhotosChange()}>
                                <Link
                                    to={config.routes.user(`${userName}`)}
                                    className={cx('photos-icon', isPhotosActive ? 'active' : '')}
                                >
                                    <ImageIcon />
                                    <span>Photos {photos.total}</span>
                                </Link>
                            </div>
                            <div onClick={() => !isLikesActive && handleLikesChange()}>
                                <Link
                                    to={config.routes.userLike(`${userName}`)}
                                    className={cx('likes-icon', isLikesActive ? 'active' : '')}
                                >
                                    <Heart />
                                    <span>Likes {photoLikes.total}</span>
                                </Link>
                            </div>
                            <div onClick={() => !isCollectionsActive && handleCollectionsChange()}>
                                <Link
                                    to={config.routes.userCollection(`${userName}`)}
                                    className={cx('collections-icon', isCollectionsActive ? 'active' : '')}
                                >
                                    <CollectionIcon />
                                    <span>Collections {collections.total}</span>
                                </Link>
                            </div>
                        </div>
                        <div className={cx('content-body')}>
                            {data && isPhotosActive && (
                                // data.map((photo) => (
                                //     <PhotoHover
                                //         key={photo.id}
                                //         data={photo}
                                //         hardWidthVW={25}
                                //         hardHeightVH={30}
                                //         className={'user-photos'}
                                //     />
                                // ))}
                                <PhotoList data={data} width={'500px'} />
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
                                <PhotoList data={likePhotosData} width={'500px'} />
                            )}
                            {collectionsData &&
                                isCollectionsActive &&
                                collectionsData.map((collection) => (
                                    <CollectionCard key={collection.id} collection={collection} />
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default User;
