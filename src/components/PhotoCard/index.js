import classNames from 'classnames/bind';
import styles from './PhotoCard.module.scss';
import config from '~/config';
import Button from '../Button';
import { scrollToTop, reload } from '~/helpers';
import PhotoItem from '../PhotoItem';

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
            <div className={cx('card')}>
                <div className={cx('wrapper-image')}>
                    <PhotoItem
                        data={data}
                        onClick={handleClick}
                        className={className}
                        hardWidthVW={20}
                        hardHeightVH={25}
                    />
                </div>
                {profileImage && <img src={data.user.profile_image.medium} alt="" className={cx('profile-image')} />}
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
