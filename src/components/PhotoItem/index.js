import classNames from 'classnames/bind';
import styles from './PhotoItem.module.scss';

import { useState, useEffect } from 'react';
import { CloseIcon, Download, Heart } from '../Icons';
import { Link } from 'react-router-dom';
import config from '~/config';
import Button from '../Button';
import { calculateImageSize, scrollToTop, reload } from '~/helpers';
import BlurhashItem from '../Blurhash';

const cx = classNames.bind(styles);

function PhotoItem({
    data,
    className,
    width,
    height,
    card = false,
    info = false,
    button = false,
    profileImage = false,
    popUp = false,
    popUpAction = false,
    checkScrollToTop = false,
    checkReload = false,
    passProps,
}) {
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const [zoom, setZoom] = useState(true);
    const { calculatedWidth, calculatedHeight } = calculateImageSize(data, 900);

    //console.log(data);
    useEffect(() => {
        if (!visible) return;
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'scroll');
    }, [visible]);

    const handleZoom = () => {
        const content = document.getElementsByClassName(cx('popup-content'));
        const image = document.getElementsByClassName(cx('popup-image'));
        if (zoom) {
            content[0].style.height = '100vh';
            content[0].style.width = '100vw';
            image[0].style.cursor = 'zoom-out';
            setZoom(false);
        } else {
            content[0].style.height = `80vh`;
            content[0].style.width = `75vw`;
            image[0].style.cursor = 'zoom-in';
            setZoom(true);
        }
    };

    const handleClick = async () => {
        checkScrollToTop && scrollToTop();
        (await checkReload) && reload();
        popUp ? show() : hide();
    };

    const classes = cx(card && 'card', { [className]: className });

    return (
        <div className={cx('wrapper')}>
            <div className={classes}>
                <div className={cx('wrapper-image')}>
                    <img
                        src={data.urls.regular}
                        alt=""
                        className={cx('image')}
                        style={{ width: `${width}vw`, height: `${height}vh` }}
                        onClick={handleClick}
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
            {popUp && visible && (
                <div style={{ marginTop: window.scrollY }} className={cx('popup-wrapper')}>
                    <div
                        style={{ width: `${calculatedWidth}vw`, height: `${calculatedHeight}vh` }}
                        className={cx('popup-content')}
                    >
                        <BlurhashItem
                            photo={data}
                            contentPhotoWidth={75}
                            contentPhotoHeight={80}
                            className={'popup-image'}
                        />
                        <img src={data.urls.full} alt="" className={cx('popup-image')} onClick={handleZoom} />
                        {zoom && (
                            <>
                                <div className={cx('popup-profile')}>
                                    <img
                                        src={data.user.profile_image.medium}
                                        alt=""
                                        className={cx('popup-profile-image')}
                                    />
                                    <span>{data.user.first_name}</span>
                                </div>
                                {popUpAction && (
                                    <div className={cx('popup-action')}>
                                        <Link
                                            to={config.routes.detailPhoto(`${data.id}`)}
                                            className={cx('popup-btn-more-info')}
                                        >
                                            More Info
                                        </Link>
                                        <button className={cx('popup-btn-download')}>
                                            <Download />
                                        </button>
                                        <button className={cx('popup-btn-heart')}>
                                            <Heart />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    {zoom && (
                        <button className={cx('btn-close')} onClick={hide}>
                            <CloseIcon width="1.5rem" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default PhotoItem;
