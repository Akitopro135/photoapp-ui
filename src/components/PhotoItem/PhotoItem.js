import classNames from 'classnames/bind';
import styles from './PhotoItem.module.scss';
import { useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { calculateImageSize } from '~/helpers';

const cx = classNames.bind(styles);

function PhotoItem({
    data,
    widthPC,
    hardWidthPX,
    hardHeightPX,
    hardWidthVW,
    hardHeightVH,
    className,
    onClick,
    passProps,
}) {
    const [loading, setLoading] = useState(true);

    const props = {
        onClick,
        ...passProps,
    };

    const { widthPX: calculatedWidth, heightPX: calculatedHeight } = calculateImageSize({
        photo: data,
        width: widthPC,
    });

    const { heightVH } = calculateImageSize({
        photo: data,
        widthVW: hardWidthVW,
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
                    width={hardWidthPX ? `${hardWidthPX}px` : hardWidthVW ? `${hardWidthVW}vw` : `${calculatedWidth}px`}
                    height={
                        hardHeightPX
                            ? `${hardHeightPX}px`
                            : hardHeightVH
                            ? `${hardHeightVH}vh`
                            : hardWidthVW
                            ? `${heightVH}vw`
                            : `${calculatedHeight}px`
                    }
                    style={{ marginBottom: 4, marginTop: 4 }}
                />
            )}
            <img
                src={data.urls.regular}
                alt=""
                className={cx('image', { hidden: loading })}
                style={{
                    width: hardWidthPX ? `${hardWidthPX}px` : hardWidthVW ? `${hardWidthVW}vw` : `${calculatedWidth}px`,
                    height: hardHeightPX
                        ? `${hardHeightPX}px`
                        : hardHeightVH
                        ? `${hardHeightVH}vh`
                        : hardWidthVW
                        ? `${heightVH}vw`
                        : `${calculatedHeight}px`,
                }}
                onLoad={handleLoad}
            />
        </div>
    );
}

export default PhotoItem;
