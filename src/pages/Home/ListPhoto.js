import classNames from 'classnames/bind';
import styles from './ListPhoto.module.scss';
import { useState } from 'react';
import { AngleLeft, AngleRight } from '~/components/Icons';
import { Link } from 'react-router-dom';
import config from '~/config';
import { PhotoCard } from '~/components/PhotoCard';

const cx = classNames.bind(styles);

function ListPhoto({ data, title, morePhoto = false, className }) {
    const [changeImage, setChangeImage] = useState(true);

    const hangleChangeImage = () => {
        setChangeImage(changeImage ? false : true);
    };

    return (
        <div className={cx('wrapper-list')}>
            <div className={cx(morePhoto ? 'list-header' : '')}>
                <h1>{title} Image</h1>
                {morePhoto && (
                    <Link
                        to={config.routes.search({ searchId: title, value: 'photos' })}
                        className={cx('btn-seemore')}
                        onClick={() => window.scrollTo({ top: 0 })}
                    >
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
                        <PhotoCard data={data[1]} className={className} info button profileImage />
                        <PhotoCard data={data[0]} className={className} info button profileImage />
                        <PhotoCard data={data[2]} className={className} info button profileImage />
                    </div>
                ) : (
                    <div className={cx('list-body-image')}>
                        <PhotoCard data={data[3]} className={className} info button profileImage />
                        <PhotoCard data={data[4]} className={className} info button profileImage />
                        <PhotoCard data={data[5]} className={className} info button profileImage />
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
