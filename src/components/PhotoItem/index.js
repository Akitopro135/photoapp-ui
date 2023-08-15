import classNames from 'classnames/bind';
import styles from './PhotoItem.module.scss';

import { useState, useEffect } from 'react';
import { CloseIcon, Download, Heart } from '../Icons';
import { Link } from 'react-router-dom';
import config from '~/config';
import Button from '../Button';
import { calculateImageSize } from '~/helpers';

const cx = classNames.bind(styles);

function PhotoItem({
    data,
    className,
    passProp,
    width,
    height,
    info = false,
    button = false,
    profileImage = false,
    popUp = false,
    popUpAction = false,
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

    const handleClick = () => {
        const content = document.getElementsByClassName(cx('popup-content'));
        const image = document.getElementsByClassName(cx('popup-image'));
        if (zoom) {
            content[0].style.height = '100vh';
            content[0].style.width = '100vw';
            image[0].style.cursor = 'zoom-out';
            setZoom(false);
        } else {
            content[0].style.height = `${calculatedHeight}vh`;
            content[0].style.width = `${calculatedWidth}vw`;
            image[0].style.cursor = 'zoom-in';
            setZoom(true);
        }
    };

    const classes = cx({ [className]: className });

    return (
        <div className={cx('wrapper')}>
            <div className={classes}>
                <div className={cx('wrapper-image')}>
                    <img
                        src={data.urls.regular}
                        alt=""
                        className={cx('image')}
                        style={{ width: `${width}vw`, height: `${height}vh` }}
                        onClick={popUp ? show : hide}
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
                        <img src={data.urls.regular} alt="" className={cx('popup-image')} onClick={handleClick} />
                        {zoom && (
                            <>
                                (
                                <div className={cx('popup-profile')}>
                                    <img
                                        src={data.user.profile_image.medium}
                                        alt=""
                                        className={cx('popup-profile-image')}
                                    />
                                    <span>{data.user.first_name}</span>
                                </div>
                                )
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
