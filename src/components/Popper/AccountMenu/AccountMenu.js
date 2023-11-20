import classNames from 'classnames/bind';
import styles from './AccountMenu.module.scss';

import { Link } from 'react-router-dom';
import config from '~/config';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);

function AccountMenu({ data, showResult, setShowResult, children }) {
    return (
        <>
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
                                <Link to={config.routes.account.edit()} className={cx('setting-btn')}>
                                    Account settings
                                </Link>
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
                {children}
            </Tippy>
        </>
    );
}

export default AccountMenu;
