import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import { LoadingIcon } from '../Icons';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('loading-wrapper')}>
            <div className={cx('loading')}>
                <LoadingIcon />
            </div>
            Loading...
        </div>
    );
}

export default Loading;
