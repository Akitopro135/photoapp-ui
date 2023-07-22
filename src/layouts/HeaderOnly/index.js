import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';

import Header from '~/layouts/components/Header';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-wrapper')}>
                <Header />
            </div>
            <div className={cx('section')}>
                <div className={cx('container')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
