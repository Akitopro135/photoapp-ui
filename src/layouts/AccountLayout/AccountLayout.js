import classNames from 'classnames/bind';
import styles from './AccountLayout.module.scss';

import { AccountHeader } from './AccountHeader';
import { AccountSidebar } from './AccountSidebar';

const cx = classNames.bind(styles);

function AccountLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <AccountHeader />
            <div className={cx('section')}>
                <AccountSidebar />
                <div className={cx('container')}>{children}</div>
            </div>
        </div>
    );
}

export default AccountLayout;
