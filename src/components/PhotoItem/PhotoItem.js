import classNames from 'classnames/bind';
import styles from './PhotoItem.module.scss';
import { useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { calculateImageSize } from '~/helpers';

const cx = classNames.bind(styles);

function PhotoItem({ data, widthPC, hardWidthVW, hardHeightVH, className, onClick, passProps }) {
    const [loading, setLoading] = useState(true);

    const props = {
        onClick,
        ...passProps,
    };

    const { widthPX: calculatedWidth, heightPX: calculatedHeight } = calculateImageSize({
        photo: data,
        width: widthPC,
    });

    const handleLoad = () => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    let classes = cx('wrapper-image', { [className]: className });

    return (
        <div className={cx({ hidden: loading }, classes)} {...props}>
            {loading && data.blur_hash && (
                <Blurhash
                    hash={data.blur_hash}
                    width={hardWidthVW ? `${hardWidthVW}vw` : `${calculatedWidth}px`}
                    height={hardHeightVH ? `${hardHeightVH}vw` : `${calculatedHeight}px`}
                    //style={{ margin: 2 }}
                />
            )}
            <img
                src={data.urls.regular}
                alt=""
                className={cx('image', { hidden: loading })}
                style={{
                    width: hardWidthVW ? `${hardWidthVW}vw` : `${calculatedWidth}px`,
                    height: hardHeightVH ? `${hardHeightVH}vw` : `${calculatedHeight}px`,
                }}
                onLoad={handleLoad}
            />
        </div>
    );
}

export default PhotoItem;
