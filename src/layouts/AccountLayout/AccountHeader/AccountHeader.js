import classNames from 'classnames/bind';
import styles from './AccountHeader.module.scss';

import { Link } from 'react-router-dom';

import config from '~/config';
import images from '~/assets/images';

import { useUser } from '~/unsplash/hooks';

import { useState } from 'react';
import { AccountMenu } from '~/components/Popper/AccountMenu';

const cx = classNames.bind(styles);

function AccountHeader() {
    const [showResult, setShowResult] = useState(false);

    const { data } = useUser({
        username: localStorage.getItem('currentId'),
    });

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
                <div className={cx('actions')}>
                    {data && (
                        <AccountMenu data={data} setShowResult={setShowResult} showResult={showResult}>
                            <div>
                                <button
                                    className={cx('account-btn')}
                                    onClick={() =>
                                        showResult === 'account' ? setShowResult('') : handleTab('account')
                                    }
                                >
                                    <img src={data.profile_image.medium} className={cx('profile-image')} alt="" />
                                </button>
                            </div>
                        </AccountMenu>
                    )}
                </div>
            </div>
        </header>
    );
}

export default AccountHeader;
