import classNames from 'classnames/bind';
import styles from './ListPhoto.module.scss';
import { useState } from 'react';
import { AngleLeft, AngleRight } from '~/components/Icons';
import PhotoItem from '~/components/PhotoItem';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function ListPhoto({ data, title, morePhoto = false }) {
    const [changeImage, setChangeImage] = useState(true);

    const hangleChangeImage = () => {
        setChangeImage(changeImage ? false : true);
    };

    return (
        data[0] && (
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
                            <PhotoItem data={data[0]} className={'card-home'} info button profileImage popUp />
                            <PhotoItem data={data[1]} className={'card-home'} info button profileImage popUp />
                            <PhotoItem data={data[2]} className={'card-home'} info button profileImage popUp />
                        </div>
                    ) : (
                        <div className={cx('list-body-image')}>
                            <PhotoItem data={data[3]} className={'card-home'} info button profileImage popUp />
                            <PhotoItem data={data[4]} className={'card-home'} info button profileImage popUp />
                            <PhotoItem data={data[5]} className={'card-home'} info button profileImage popUp />
                        </div>
                    )}
                    <button className={cx('angle-btn')} onClick={hangleChangeImage}>
                        <AngleRight />
                    </button>
                </div>
            </div>
        )
    );
}

export default ListPhoto;
