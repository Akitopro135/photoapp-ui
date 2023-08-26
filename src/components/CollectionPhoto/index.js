import classNames from 'classnames/bind';
import styles from './CollectionPhoto.module.scss';
import PhotoItem from '../PhotoItem';

const cx = classNames.bind(styles);

function CollectionPhoto({ data }) {
    const length = data.length;

    if (length === 1) {
        return (
            <div className={cx('wrapper')}>
                <PhotoItem data={data[0]} hardWidthVW={20} hardHeightVH={20} className={'collection-image'} />
            </div>
        );
    } else if (length === 2) {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('left-item')}>
                    <PhotoItem data={data[0]} hardWidthVW={10} hardHeightVH={20} className={'collection-image'} />
                </div>
                <div className={cx('right-item')}>
                    <PhotoItem data={data[1]} hardWidthVW={10} hardHeightVH={20} className={'collection-image'} />
                </div>
            </div>
        );
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-item')}>
                <PhotoItem data={data[0]} hardWidthVW={10} hardHeightVH={20} className={'collection-image'} />
            </div>
            <div className={cx('right-item')}>
                <PhotoItem data={data[1]} hardWidthVW={10} hardHeightVH={10} className={'collection-image'} />
                <PhotoItem data={data[2]} hardWidthVW={10} hardHeightVH={10} className={'collection-image'} />
            </div>
        </div>
    );
}

export default CollectionPhoto;
