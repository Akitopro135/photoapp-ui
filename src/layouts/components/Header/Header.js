import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import config from '~/config';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Search } from '../Search';
import { Button } from '~/components/Button';

const cx = classNames.bind(styles);

function Header() {
    const currentUser = localStorage.getItem('unsplashToken') ? true : false;
    // const urlParams = new URLSearchParams(window.location.search);

    // useEffect(() => {
    //     if (urlParams.size !== 0) {
    //         getToken();
    //     }
    // }, [urlParams]);

    // const getToken = () => {
    //     const baseUrl = 'https://unsplash.com/oauth/token';
    //     const codeParam = `code=${urlParams.get('code')}`;
    //     const clientId = `client_id=${process.env.REACT_APP_ACCESS_KEY}`;
    //     const clientSecret = `client_secret=${process.env.REACT_APP_ACCESS_SECRET_KEY}`;
    //     const redirect = `redirect_uri=http://localhost:3000/`;
    //     const grantType = 'grant_type=authorization_code';

    //     const axiosInstance = axios.create();

    //     const url = `${baseUrl}?${clientId}&${clientSecret}&${redirect}&${codeParam}&${grantType}`;

    //     axios
    //         .post(url)
    //         .then((response) => {
    //             console.log('Access Token:', response.data.access_token);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // };

    const loginWithUnsplash = () => {
        const baseUrl = 'https://unsplash.com/oauth/authorize';
        const clientId = `client_id=${process.env.REACT_APP_ACCESS_KEY}`;
        const redirect = `redirect_uri=http://localhost:3000/`;
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

        const url = `${baseUrl}?${clientId}&${redirect}&${responseType}&${scope}`;
        //const url = `${baseUrl}?${clientId}&${redirect}&${responseType}`;

        return url;
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
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
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
