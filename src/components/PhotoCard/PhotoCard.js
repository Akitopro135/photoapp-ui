import classNames from 'classnames/bind';
import styles from './PhotoCard.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';

import { Button } from '../Button';
import { scrollToTop, reload } from '~/helpers';
import { PhotoItem } from '../PhotoItem';

const cx = classNames.bind(styles);

function PhotoCard({
    data,
    className,
    info = false,
    button = false,
    profileImage = false,
    checkScrollToTop = false,
    checkReload = false,
    width = 24,
    height = 12,
    passProps,
}) {
    const handleClick = async () => {
        checkScrollToTop && scrollToTop();
        (await checkReload) && reload();
    };

    return (
        <div className={cx('wrapper')}>
            <div style={{ width: `${width}vw`, height: `${height * 2}vw` }} className={cx('card')}>
                <div className={cx('wrapper-image')}>
                    <Link to={config.routes.detailPhoto(`${data.id}`)}>
                        <PhotoItem
                            data={data}
                            onClick={handleClick}
                            className={className}
                            hardWidthVW={width}
                            hardHeightVH={height}
                        />
                    </Link>
                </div>
                {profileImage && (
                    <Link
                        to={config.routes.user({ userName: `${data.user.username}`, value: 'user' })}
                        className={cx('profile-image')}
                    >
                        <img src={data.user.profile_image.medium} alt="" />
                    </Link>
                )}
                {info && (
                    <div className={cx('profile-user-name')}>
                        <span>{data.user.first_name}</span>
                    </div>
                )}
                {button && (
                    <Button to={config.routes.detailPhoto(`${data.id}`)} className={'home-more-info-btn'}>
                        <h2>More Info</h2>
                    </Button>
                )}
            </div>
        </div>
    );
}

export default PhotoCard;
