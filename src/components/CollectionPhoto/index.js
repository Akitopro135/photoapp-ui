import classNames from 'classnames/bind';
import styles from './CollectionPhoto.module.scss';

const cx = classNames.bind(styles);

function CollectionPhoto({ data }) {
    return (
        <div className={cx('wrapper')}>
            <img src={data[0].urls.regular} className={cx('image1')} />
            <div className={cx('right-item')}>
                <img src={data[1].urls.regular} className={cx('image2')} />
                <img src={data[2].urls.regular} className={cx('image3')} />
            </div>
        </div>
    );
}

export default CollectionPhoto;
