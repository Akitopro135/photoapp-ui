import classNames from 'classnames/bind';
import styles from './ListPhoto.module.scss';
import { useState } from 'react';
import { AngleLeft, AngleRight } from '~/components/Icons';
import PhotoItem from '~/components/PhotoItem';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function ListPhoto({ data, title, morePhoto = false, className }) {
    const [changeImage, setChangeImage] = useState(true);

    const hangleChangeImage = () => {
        setChangeImage(changeImage ? false : true);
    };

    const classes = cx({ [className]: className });
    return (
        <div className={cx('wrapper-list')}>
            <div className={cx(morePhoto ? 'list-header' : '')}>
                <h1>{title} Image</h1>
                {morePhoto && (
                    <Link to={config.routes.search(`${title}`)} className={cx('btn-seemore')}>
                        See more
                    </Link>
                )}
            </div>
            <div className={cx('list-body')}>
                <button className={cx('angle-btn')} onClick={hangleChangeImage}>
                    <AngleLeft />
                </button>
                {changeImage ? (
                    <div className={cx('list-body-image')}>
                        <PhotoItem data={data[1]} className={classes} card info button profileImage popUp popUpAction />
                        <PhotoItem data={data[0]} className={classes} card info button profileImage popUp popUpAction />
                        <PhotoItem data={data[2]} className={classes} card info button profileImage popUp popUpAction />
                    </div>
                ) : (
                    <div className={cx('list-body-image')}>
                        <PhotoItem data={data[3]} className={classes} card info button profileImage popUp popUpAction />
                        <PhotoItem data={data[4]} className={classes} card info button profileImage popUp popUpAction />
                        <PhotoItem data={data[5]} className={classes} card info button profileImage popUp popUpAction />
                    </div>
                )}
                <button className={cx('angle-btn')} onClick={hangleChangeImage}>
                    <AngleRight />
                </button>
            </div>
        </div>
    );
}

export default ListPhoto;
