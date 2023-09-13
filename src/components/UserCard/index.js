import classNames from 'classnames/bind';
import styles from './UserCard.module.scss';
import PhotoItem from '../PhotoItem';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function UserCard({ data }) {
    console.log(data);
    return (
        <>
            {data.photos.length > 0 && (
                <Link to={config.routes.user(`${data.username}`)} className={cx('wrapper')}>
                    <div className={cx('profile')}>
                        <img src={data.profile_image.medium} alt="" className={cx('profile-image')} />
                        <div className={cx('profile-info')}>
                            <span>{data.name}</span>
                            <span>{data.username}</span>
                        </div>
                    </div>

                    <div className={cx('photo')}>
                        {data.photos.map((photo) => (
                            <PhotoItem key={photo.id} data={photo} hardHeightVH={4} hardWidthVW={6} />
                        ))}
                    </div>
                    <div className={cx('action')}>
                        <button className={cx('btn-view')}>View profile</button>
                    </div>
                </Link>
            )}
        </>
    );
}

export default UserCard;
