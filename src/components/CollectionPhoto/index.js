import classNames from 'classnames/bind';
import styles from './CollectionPhoto.module.scss';
import PhotoItem from '../PhotoItem';
import { calculateImageSize } from '~/helpers';

const cx = classNames.bind(styles);

function CollectionPhoto({ data }) {
    const length = data.length;

    const { calculatedWidth: relatedPhotoWidth, calculatedHeight: relatedPhotoHeight } = calculateImageSize({
        data,
        width: 400,
    });

    if (length === 1) {
        return (
            <div className={cx('wrapper')}>
                <PhotoItem data={data[0]} width={20} height={40} className={'collection-image'} />
            </div>
        );
    } else if (length === 2) {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('left-item')}>
                    <PhotoItem data={data[0]} width={10} height={40} className={'collection-image'} />
                </div>
                <div className={cx('right-item')}>
                    <PhotoItem data={data[1]} width={10} height={40} className={'collection-image'} />
                </div>
            </div>
        );
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-item')}>
                <PhotoItem data={data[0]} width={10} height={40} className={'collection-image'} />
            </div>
            <div className={cx('right-item')}>
                <PhotoItem data={data[1]} width={10} height={20} className={'collection-image'} />
                <PhotoItem data={data[2]} width={10} height={20} className={'collection-image'} />
            </div>
        </div>
    );
}

export default CollectionPhoto;
