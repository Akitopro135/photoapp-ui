import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { Link } from 'react-router-dom';

import config from '~/config';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Search } from '../Search';
import { Button } from '~/components/Button';
import { useUser } from '~/unsplash/hooks';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import { useState } from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Header() {
    const [showResult, setShowResult] = useState('');

    const currentUser = localStorage.getItem('currentId') ? true : false;

    const { data } = useUser({
        username: localStorage.getItem('currentId'),
    });

    const loginWithUnsplash = () => {
        const baseUrl = 'https://unsplash.com/oauth/authorize';
        const clientId = `client_id=${process.env.REACT_APP_ACCESS_KEY}`;
        const redirect = `redirect_uri=http://localhost:3000/user/me/photos/`;
        const responseType = `response_type=code`;
        const allScope = [
            'public',
            'read_user',
            'write_user',
            'read_photos',
            'write_photos',
            'write_likes',
            'write_followers',
            'read_collections',
            'write_collections',
        ];

        const scope = `scope=${allScope.join('+')}`;

        //const url = `${baseUrl}?${clientId}&${redirect}&${responseType}&${scope}`;
        const url = `${baseUrl}?${clientId}&${redirect}&${responseType}`;

        return url;
    };

    //localStorage.clear();

    const handleTab = (tab) => {
        setShowResult(tab);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="PhotoApp" className={cx('logo-image')} />
                        <h1>PhotoApp</h1>
                    </Link>
                </div>
                <Search />
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy
                                interactive
                                visible={showResult === 'more'}
                                placement="bottom-end"
                                render={(attrs) => (
                                    <div className="box" tabIndex="-1" {...attrs}>
                                        <PopperWrapper>
                                            <div className={cx('more-tippy')}>
                                                <Link
                                                    to={config.routes.topic({ topicIdOrSlug: '' })}
                                                    className={cx('topic-btn')}
                                                >
                                                    Topics
                                                </Link>
                                                <Link
                                                    to={config.routes.collection('')}
                                                    className={cx('collection-btn')}
                                                >
                                                    Collections
                                                </Link>
                                                <button className={cx('trend-btn')}>Trends</button>
                                                <button className={cx('stats-btn')}>Stats</button>
                                                <div className={cx('another-link')}>
                                                    <a
                                                        href="https://twitter.com/unsplash?utm_medium=referral&utm_source=unsplash"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <TwitterIcon />
                                                    </a>
                                                    <a
                                                        href="https://www.facebook.com/unsplash/?utm_medium=referral&utm_source=unsplash"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <FacebookIcon />
                                                    </a>
                                                    <a
                                                        href="https://www.instagram.com/unsplash/?utm_medium=referral&utm_source=unsplash"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <InstagramIcon />
                                                    </a>
                                                </div>
                                            </div>
                                        </PopperWrapper>
                                    </div>
                                )}
                                onClickOutside={() => {
                                    setShowResult('');
                                }}
                            >
                                <div>
                                    <button
                                        className={cx('more-btn')}
                                        onClick={() => (showResult === 'more' ? setShowResult('') : handleTab('more'))}
                                    >
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </button>
                                </div>
                            </Tippy>
                            {data && (
                                <Tippy
                                    interactive
                                    visible={showResult === 'account'}
                                    placement="bottom-end"
                                    render={(attrs) => (
                                        <div className="box" tabIndex="-1" {...attrs}>
                                            <PopperWrapper>
                                                <div className={cx('account-tippy')}>
                                                    <Link
                                                        to={config.routes.user({ userName: 'me', value: 'photos' })}
                                                        className={cx('profile-btn')}
                                                    >
                                                        View profile
                                                    </Link>
                                                    <button className={cx('stats-btn')}>Stats</button>
                                                    <button className={cx('setting-btn')}>Account settings</button>
                                                    <Link
                                                        to={config.routes.home}
                                                        className={cx('logout-btn')}
                                                        onClick={() => {
                                                            localStorage.clear();
                                                        }}
                                                    >
                                                        Logout @{data.username}
                                                    </Link>
                                                </div>
                                            </PopperWrapper>
                                        </div>
                                    )}
                                    onClickOutside={() => {
                                        setShowResult('');
                                    }}
                                >
                                    <div>
                                        <button
                                            className={cx('account-btn')}
                                            onClick={() =>
                                                showResult === 'account' ? setShowResult('') : handleTab('account')
                                            }
                                        >
                                            <img
                                                src={data.profile_image.medium}
                                                className={cx('profile-image')}
                                                alt=""
                                            />
                                        </button>
                                    </div>
                                </Tippy>
                            )}
                        </>
                    ) : (
                        <>
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                            <Button href={loginWithUnsplash()}>Log In</Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
