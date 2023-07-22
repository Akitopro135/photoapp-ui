import classNames from 'classnames/bind';
import styles from './PhotoItem.module.scss';

import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function PhotoItem({ data }) {
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

    return (
        <>
            <div className={cx('wrapper')}>
                <img src={data.urls.regular} className={cx('image')} onClick={handleClick()} />
            </div>
            {visible && (
                <div style={{ marginTop: window.scrollY }} className={cx('show-wrapper')}>
                    <img src={data.urls.regular} className={cx('show-image')} onClick={handleClick()} />
                </div>
            )}
        </>
    );
}

export default PhotoItem;
