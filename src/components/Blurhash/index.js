import classNames from 'classnames/bind';
import styles from './Blurhash.module.scss';
import { useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';
const cx = classNames.bind(styles);

function BlurhashItem({ photo, contentPhotoWidth, contentPhotoHeight, className }) {
    const [shouldHide, setShouldHide] = useState(false);
    useEffect(() => {
        if (photo) {
            const image = document.getElementsByClassName(cx('image'));
            const timeout = setTimeout(() => {
                image[0].style.zIndex = 0;
                setShouldHide(true);
            }, 7000);

            return () => clearTimeout(timeout);
        }
    }, [photo]);
    return (
        <div className={cx('content-photo')}>
            <Blurhash
                hash={photo.blur_hash}
                className={cx('image', { hide: shouldHide }, className)}
                width={`${contentPhotoWidth}vw`}
                height={`${contentPhotoHeight}vh`}
            />
        </div>
    );
}

export default BlurhashItem;
