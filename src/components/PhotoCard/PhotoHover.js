import classNames from 'classnames/bind';
import styles from './PhotoHover.module.scss';
import { Link } from 'react-router-dom';
import PhotoItem from '../PhotoItem';
import config from '~/config';
import { useState } from 'react';
import { calculateImageSize } from '~/helpers';

const cx = classNames.bind(styles);

function PhotoHover({ data, check, widthPC, hardWidthVW, hardHeightVH, className, onClick, passProps }) {
    const [showInfo, setShowInfo] = useState(false);

    const { widthPX: calculatedWidth } = calculateImageSize({
        photo: data,
        width: widthPC,
    });

    const handleMouseEnter = () => {
        setShowInfo(true); // Khi rê chuột vào, hiển thị thông tin
    };

    const handleMouseLeave = () => {
        setShowInfo(false); // Khi chuột rời khỏi, ẩn thông tin
    };

    const handleLink = () => {
        if (check === 'likes') {
            return config.routes.user({ userName: `${data.user.username}`, value: 'likes' });
        } else if (check === 'collections') {
            return config.routes.user({ userName: `${data.user.username}`, value: 'collections' });
        } else {
            return config.routes.user({ userName: `${data.user.username}`, value: 'user' });
        }
    };

    return (
        <div className={cx('hover-wrapper')}>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Link to={config.routes.detailPhoto(`${data.id}`)} onClick={() => window.scrollTo({ top: 0 })}>
                    <PhotoItem
                        data={data}
                        widthPC={widthPC}
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
                    style={{ width: `${calculatedWidth}px` }}
                >
                    <Link to={handleLink()} className={cx('user-info')} onClick={() => window.scrollTo({ top: 0 })}>
                        <img src={data.user.profile_image.medium} alt="" className={cx('profile-image')} />
                        <span>{data.user.username}</span>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default PhotoHover;
