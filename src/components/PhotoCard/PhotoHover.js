import classNames from 'classnames/bind';
import styles from './PhotoHover.module.scss';
import { Link } from 'react-router-dom';
import PhotoItem from '../PhotoItem';
import config from '~/config';
import { useState } from 'react';

const cx = classNames.bind(styles);

function PhotoHover({ data, width, hardWidthVW, hardHeightVH, className, onClick, passProps }) {
    const [showInfo, setShowInfo] = useState(false);
    const handleMouseEnter = () => {
        setShowInfo(true); // Khi rê chuột vào, hiển thị thông tin
    };

    const handleMouseLeave = () => {
        setShowInfo(false); // Khi chuột rời khỏi, ẩn thông tin
    };
    return (
        <div className={cx('hover-wrapper')}>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Link to={config.routes.detailPhoto(`${data.id}`)}>
                    <PhotoItem
                        data={data}
                        width={width}
                        onClick={onClick}
                        className={className}
                        hardWidthVW={hardWidthVW}
                        hardHeightVH={hardHeightVH}
                        passProps={passProps}
                    />
                </Link>
            </div>
            {showInfo && (
                <div
                    className={cx('show-info')}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ width: width }}
                >
                    <Link
                        to={config.routes.user(`${data.user.username}`)}
                        className={cx('user-info')}
                        onClick={window.location.reload}
                    >
                        <img src={data.user.profile_image.medium} alt="" className={cx('profile-image')} />
                        <span>{data.user.username}</span>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default PhotoHover;
