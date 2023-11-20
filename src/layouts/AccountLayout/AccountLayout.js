import classNames from 'classnames/bind';
import styles from './AccountLayout.module.scss';

import { AccountHeader } from './AccountHeader';
import { AccountSidebar } from './AccountSidebar';
import { useResize } from '~/hooks';
import config from '~/config';

const cx = classNames.bind(styles);

function AccountLayout({ children }) {
    const { changeStyle } = useResize({ size: 69 });

    const shouldRender = localStorage.getItem('currentId') !== null;

    if (!shouldRender) {
        // Chuyển hướng trang khi không thỏa mãn điều kiện
        window.location = config.routes.home;
        return null; // Tránh hiển thị nội dung khi chuyển hướng
    }
    return (
        <div className={cx('wrapper')}>
            <AccountHeader />
            <div className={cx('section', changeStyle && 'resize')}>
                <AccountSidebar changeStyle={changeStyle} />
                <div className={cx('container')}>{children}</div>
            </div>
        </div>
    );
}

export default AccountLayout;
