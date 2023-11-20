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
    passProps,
}) {
    const handleClick = async () => {
        checkScrollToTop && scrollToTop();
        (await checkReload) && reload();
    };

    return (
        <div className={cx('wrapper')}>
            <div style={{ width: window.screen.width / 4, height: window.screen.height / 2 }} className={cx('card')}>
                <div className={cx('wrapper-image')}>
                    <Link to={config.routes.detailPhoto(`${data.id}`)}>
                        <PhotoItem
                            data={data}
                            onClick={handleClick}
                            className={className}
                            hardHeightPX={window.screen.height / 4}
                            hardWidthPX={window.screen.width / 4}
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
                    <Button
                        to={config.routes.detailPhoto(`${data.id}`)}
                        className={'home-more-info-btn'}
                        onClick={scrollToTop}
                    >
                        <h2>More Info</h2>
                    </Button>
                )}
            </div>
        </div>
    );
}

export default PhotoCard;
