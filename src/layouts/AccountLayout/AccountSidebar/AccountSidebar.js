import classNames from 'classnames/bind';
import styles from './AccountSidebar.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function AccountSidebar({ changeStyle }) {
    const param = window.location.pathname.split('/').filter(Boolean).pop();

    return (
        <div className={cx('wrapper', changeStyle && 're-wrapper')}>
            {!changeStyle && <h1>Account settings</h1>}
            <div className={cx('tabs', changeStyle && 'resize')}>
                <Link
                    to={param !== 'edit' && config.routes.account.edit()}
                    className={cx('edit', param === 'edit' && 'active')}
                >
                    Edit profile
                </Link>
                <Link
                    to={param !== 'collections' && config.routes.account.collectionManage()}
                    className={cx('collections', param === 'collections' && 'active')}
                >
                    Collections
                </Link>
            </div>
        </div>
    );
}

export default AccountSidebar;
