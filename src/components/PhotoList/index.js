import classNames from 'classnames/bind';
import styles from './PhotoList.module.scss';
import { PhotoHover } from '../PhotoCard';
import { calculateImageSize } from '~/helpers';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function PhotoList({ data, check, widthPC }) {
    const [isWidthInRange, setIsWidthInRange] = useState(false);

    const handleResize = () => {
        // Xử lý khi chiều rộng thay đổi
        if (
            (window.screen.width * 33) / 100 < window.innerWidth &&
            window.innerWidth < (window.screen.width * 96) / 100
        ) {
            setIsWidthInRange(true);
        } else {
            setIsWidthInRange(false);
        }
    };

    useEffect(() => {
        // Gắn sự kiện lắng nghe sự thay đổi chiều rộng
        window.addEventListener('resize', handleResize);

        // Lần đầu tiên khi tải trang, gọi hàm xử lý
        handleResize();

        // Làm sạch sự kiện khi component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderColumns = () => {
        const columns = isWidthInRange ? [column4, column5] : [column1, column2, column3];
        return columns.map((column, index) => (
            <div key={index} className={cx('column')}>
                {column}
            </div>
        ));
    };

    const column1 = [];
    const column2 = [];
    const column3 = [];
    const column4 = [];
    const column5 = [];

    let height1 = 0;
    let height2 = 0;
    let height3 = 0;
    let height4 = 0;
    let height5 = 0;

    data &&
        data.forEach((photo) => {
            const { heightPX: calculatedHeight } = calculateImageSize({
                photo: photo,
                width: widthPC,
            });

            if (isWidthInRange) {
                let smallestHeight = Math.min(height4, height5);
                if (height4 === smallestHeight) {
                    column4.push(<PhotoHover key={photo.id} data={photo} widthPC={widthPC} check={check} />);
                    height4 += Math.floor(calculatedHeight);
                } else {
                    column5.push(<PhotoHover key={photo.id} data={photo} widthPC={widthPC} check={check} />);
                    height5 += Math.floor(calculatedHeight);
                }
            } else {
                let smallestHeight = Math.min(height1, height2, height3);
                if (height1 === smallestHeight) {
                    column1.push(<PhotoHover key={photo.id} data={photo} widthPC={widthPC} check={check} />);
                    height1 += Math.floor(calculatedHeight);
                } else if (height2 === smallestHeight) {
                    column2.push(<PhotoHover key={photo.id} data={photo} widthPC={widthPC} check={check} />);
                    height2 += Math.floor(calculatedHeight);
                } else {
                    column3.push(<PhotoHover key={photo.id} data={photo} widthPC={widthPC} check={check} />);
                    height3 += Math.floor(calculatedHeight);
                }
            }
        });

    return <div className={cx('row')}>{renderColumns()}</div>;
}

export default PhotoList;
