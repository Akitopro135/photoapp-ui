import classNames from 'classnames/bind';
import styles from './AccountSidebar.module.scss';

const cx = classNames.bind(styles);

function AccountSidebar() {
    return (
        <div className={cx('wrapper')}>
            <h1>Account settings</h1>
            <span>Edit profile</span>
            <span>Test</span>
        </div>
    );
}

export default AccountSidebar;
