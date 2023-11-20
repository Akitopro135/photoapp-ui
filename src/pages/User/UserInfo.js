import classNames from 'classnames/bind';
import styles from './UserInfo.module.scss';
import config from '~/config';

import { Link } from 'react-router-dom';
import { InstagramIcon, LinkIcon, LocationDot, TwitterIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function UserInfo({ user, changeStyle }) {
    return (
        <div className={cx('title', changeStyle && 'title-change')}>
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
                    <a href={`https://www.twitter.com/${user.social.twitter_username}`} className={cx('connect-icon')}>
                        <TwitterIcon />
                        <span>Twitter</span>
                    </a>
                )}

                {user.social.portfolio_url && (
                    <a href={`http://www.neom.com`} className={cx('connect-icon')}>
                        <LinkIcon />
                        <span>
                            {user.social.portfolio_url.substring(user.social.portfolio_url.indexOf('www.') + 4)}
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
    );
}

export default UserInfo;
