import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { Link } from 'react-router-dom';

import config from '~/config';
import images from '~/assets/images';
import { Search } from '../Search';
import { Button } from '~/components/Button';
import { useUser } from '~/unsplash/hooks';

import { useState } from 'react';
import { loginWithUnsplash } from '~/unsplash/utils/token';
import { AccountMenu } from '~/components/Popper/AccountMenu';
import { Menu } from '~/components/Popper/Menu';
import { MoreIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Header() {
    const [showResult, setShowResult] = useState('');

    const currentUser = localStorage.getItem('currentId') ? true : false;

    const { data } = useUser({
        username: localStorage.getItem('currentId'),
    });

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
                            <Menu showResult={showResult} setShowResult={setShowResult}>
                                <div>
                                    <button
                                        className={cx('more-btn')}
                                        onClick={() => (showResult === 'more' ? setShowResult('') : handleTab('more'))}
                                    >
                                        <MoreIcon />
                                    </button>
                                </div>
                            </Menu>
                            {data && (
                                <AccountMenu data={data} showResult={showResult} setShowResult={setShowResult}>
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
                                </AccountMenu>
                            )}
                        </>
                    ) : (
                        <>
                            <button className={cx('more-btn')}>
                                <MoreIcon />
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
