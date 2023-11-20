import classNames from 'classnames/bind';
import styles from './UserCard.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';
import { PhotoItem } from '../PhotoItem';

const cx = classNames.bind(styles);

function UserCard({ data, checkPhoto = false, className }) {
    let classes = cx({ [className]: className });
    return (
        <>
            {
                <Link
                    to={config.routes.user({ userName: `${data.username}`, value: 'user' })}
                    style={{ width: window.screen.width / 3.6 }}
                    className={classes}
                >
                    <div className={cx('profile')}>
                        <img src={data.profile_image.medium} alt="" className={cx('profile-image')} />
                        <div className={cx('profile-info')}>
                            <span>{data.name}</span>
                            <span>{data.username}</span>
                        </div>
                    </div>

                    {checkPhoto && (
                        <div className={cx('photo')}>
                            {data.photos.map((photo) => (
                                <PhotoItem key={photo.id} data={photo} hardHeightPX={100} hardWidthPX={120} />
                            ))}
                        </div>
                    )}
                    <div className={cx('action')}>
                        <button className={cx('btn-view')}>View profile</button>
                    </div>
                </Link>
            }
        </>
    );
}

export default UserCard;
