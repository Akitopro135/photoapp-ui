import classNames from 'classnames/bind';
import styles from './PhotoItem.module.scss';
import { useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { calculateImageSize } from '~/helpers';

const cx = classNames.bind(styles);

function PhotoItem({ data, width, hardWidthVW, hardHeightVH, className, onClick, passProps }) {
    const [loading, setLoading] = useState(true);

    const props = {
        onClick,
        ...passProps,
    };

    const { calculatedWidth, calculatedHeight } = calculateImageSize({
        photo: data,
        width: width,
    });

    const handleLoad = () => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    let classes = cx('wrapper-image', { [className]: className });

    return (
        <div className={cx({ hidden: loading }, classes)} {...props}>
            {loading && (
                <Blurhash
                    hash={data.blur_hash}
                    width={`${hardWidthVW || calculatedWidth}vw`}
                    height={`${hardHeightVH || calculatedHeight}vw`}
                />
            )}
            <img
                src={data.urls.regular}
                alt=""
                className={cx('image', { hidden: loading })}
                style={{
                    width: `${hardWidthVW || calculatedWidth}vw`,
                    height: `${hardHeightVH || calculatedHeight}vw`,
                }}
                onLoad={handleLoad}
            />
        </div>
    );
}

export default PhotoItem;
