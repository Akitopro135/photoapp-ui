import classNames from 'classnames/bind';
import styles from './PhotoItem.module.scss';

import { useState, useEffect } from 'react';
import { CloseIcon } from '../Icons';
import { Link } from 'react-router-dom';
import config from '~/config';
import Button from '../Button';

const cx = classNames.bind(styles);

function PhotoItem({ data, className, classNameImage, passProp, info = false, button = false, profile_image = false }) {
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    useEffect(() => {
        if (!visible) return;
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'scroll');
    }, [visible]);

    const handleClick = () => {
        return visible ? hide : show;
    };

    const imageClasses = cx({ [classNameImage]: classNameImage });
    const classes = cx({ [className]: className });

    return (
        <div className={cx('wrapper')}>
            <div className={classes}>
                <div>
                    <img src={data.urls.regular} className={imageClasses} onClick={handleClick()} />
                </div>
                {profile_image && <img src={data.user.profile_image.medium} className={cx('profile-image')} />}
                {info && (
                    <div>
                        <h1>{data.user.first_name}</h1>
                    </div>
                )}
                {button && <Button className={'home-more-info-btn'}>More Info</Button>}
            </div>
            {visible && (
                <div style={{ marginTop: window.scrollY }} className={cx('show-wrapper')}>
                    <Link to={config.routes.detailPhoto(`${data.id}`)}>
                        <img src={data.urls.regular} className={cx('show-image')} />
                    </Link>
                    <button className={cx('btn-close')} onClick={handleClick()}>
                        <CloseIcon width="1.5rem" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default PhotoItem;
