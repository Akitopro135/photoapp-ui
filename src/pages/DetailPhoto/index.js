import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailPhoto } from '~/services/searchServices';
import classNames from 'classnames/bind';
import styles from './DetailPhoto.module.scss';
import { Download, Heart } from '~/components/Icons';
import PhotoItem from '~/components/PhotoItem';

const cx = classNames.bind(styles);

function DetailPhoto() {
    const [photo, setPhoto] = useState();

    const params = useParams();
    const id = params.id.slice(0, params.id.length);

    useEffect(() => {
        const fetchApi = async () => {
            const photo = await getDetailPhoto(id);
            console.log(photo);
            setPhoto(photo);
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('detail-wrapper')}>
            <div className={cx('detail-header')}>
                <div className={cx('detail-header-user')}>
                    <img src={photo.user.profile_image.medium} className={cx('profile-image')} />
                    <span>{photo.user.name}</span>
                </div>
                <div className={cx('detail-header-actions')}>
                    <button className={cx('btn-download')}>
                        <Download />
                    </button>
                    <button className={cx('btn-heart')}>
                        <Heart />
                    </button>
                </div>
            </div>
            <div className={cx('detail-content')}>
                <div className={cx('content-photo-detail')}>
                    <PhotoItem data={photo} />
                </div>
            </div>
        </div>
    );
}

export default DetailPhoto;
