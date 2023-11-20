import classNames from 'classnames/bind';
import styles from './CollectionPhoto.module.scss';
import { PhotoItem } from '../PhotoItem';
import { NothingIcon } from '../Icons';

const cx = classNames.bind(styles);

function CollectionPhoto({ data }) {
    if (data === null) {
        return (
            <div className={cx('wrapper-none')}>
                <NothingIcon width="480px" height="320px" />
            </div>
        );
    }
    const length = data.length;
    if (length === 1) {
        return (
            <div className={cx('wrapper')}>
                <PhotoItem data={data[0]} hardHeightPX={320} hardWidthPX={480} className={'collection-image'} />
            </div>
        );
    } else if (length === 2) {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('left-item')}>
                    <PhotoItem data={data[0]} hardHeightPX={320} hardWidthPX={240} className={'collection-image'} />
                </div>
                <div className={cx('right-item')}>
                    <PhotoItem data={data[0]} hardHeightPX={320} hardWidthPX={240} className={'collection-image'} />
                </div>
            </div>
        );
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-item')}>
                <PhotoItem data={data[0]} hardHeightPX={320} hardWidthPX={320} className={'collection-image'} />
            </div>
            <div className={cx('right-item')}>
                <PhotoItem data={data[2]} hardHeightPX={155} hardWidthPX={160} className={'collection-image'} />
                <PhotoItem data={data[2]} hardHeightPX={155} hardWidthPX={160} className={'collection-image'} />
            </div>
        </div>
    );
}

export default CollectionPhoto;
