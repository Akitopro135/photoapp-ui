import classNames from 'classnames/bind';
import styles from './CollectionPhoto.module.scss';
import PhotoItem from '../PhotoItem';

const cx = classNames.bind(styles);

function CollectionPhoto({ data }) {
    if (data === null) {
        return;
    }
    const length = data.length;
    if (length === 1) {
        return (
            <div className={cx('wrapper')}>
                <PhotoItem data={data[0]} hardWidthVW={'24vw'} hardHeightVH={'16vw'} className={'collection-image'} />
            </div>
        );
    } else if (length === 2) {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('left-item')}>
                    <PhotoItem
                        data={data[0]}
                        hardWidthVW={'12vw'}
                        hardHeightVH={'16vw'}
                        className={'collection-image'}
                    />
                </div>
                <div className={cx('right-item')}>
                    <PhotoItem
                        data={data[1]}
                        hardWidthVW={'12vw'}
                        hardHeightVH={'16vw'}
                        className={'collection-image'}
                    />
                </div>
            </div>
        );
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-item')}>
                <PhotoItem data={data[0]} hardWidthVW={'16vw'} hardHeightVH={'16vw'} className={'collection-image'} />
            </div>
            <div className={cx('right-item')}>
                <PhotoItem data={data[1]} hardWidthVW={'8vw'} hardHeightVH={'8vw'} className={'collection-image'} />
                <PhotoItem data={data[2]} hardWidthVW={'8vw'} hardHeightVH={'8vw'} className={'collection-image'} />
            </div>
        </div>
    );
}

export default CollectionPhoto;
