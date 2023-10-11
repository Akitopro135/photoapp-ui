import classNames from 'classnames/bind';
import styles from './PhotoList.module.scss';
import { PhotoHover } from '../PhotoCard';
import { calculateImageSize } from '~/helpers';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function PhotoList({ data, check }) {
    const [isWidthInRange, setIsWidthInRange] = useState(3);

    const handleResize = () => {
        // Xử lý khi chiều rộng thay đổi
        if (
            (window.screen.width * 33) / 100 < window.innerWidth &&
            window.innerWidth < (window.screen.width * 66) / 100
        ) {
            setIsWidthInRange(2);
        } else if (window.innerWidth < (window.screen.width * 33) / 100) {
            setIsWidthInRange(1);
        } else {
            setIsWidthInRange(3);
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
        return columns.map((column, index) => (
            <div key={index} className={cx('column')}>
                {column}
            </div>
        ));
    };

    const columns = Array.from({ length: isWidthInRange }, () => []);

    const columnHeights = Array.from({ length: isWidthInRange }, () => 0);

    const photoComponents =
        data &&
        data.map((photo) =>
            isWidthInRange === 2 ? (
                <PhotoHover key={photo.id} data={photo} hardWidthVW={48} check={check} />
            ) : isWidthInRange === 3 ? (
                <PhotoHover key={photo.id} data={photo} hardWidthVW={31} check={check} />
            ) : (
                <PhotoHover key={photo.id} data={photo} hardWidthVW={97} check={check} />
            ),
        );

    data &&
        photoComponents.forEach((photo) => {
            const { heightPX: calculatedHeight } = calculateImageSize({
                photo: photo.props.data,
                width: photo.props.hardWidthVW,
            });
            const minHeight = Math.min(...columnHeights);
            const index = columnHeights.indexOf(minHeight);
            columns[index].push(photo);
            columnHeights[index] += calculatedHeight;
        });

    return <div className={cx('row')}>{renderColumns()}</div>;
}

// function PhotoList({ data, check, widthPC }) {
//     const [isWidthInRange, setIsWidthInRange] = useState(3);

//     const handleResize = () => {
//         // Xử lý khi chiều rộng thay đổi
//         if (
//             (window.screen.width * 33) / 100 < window.innerWidth &&
//             window.innerWidth < (window.screen.width * 66) / 100
//         ) {
//             setIsWidthInRange(2);
//         } else if (window.innerWidth < (window.screen.width * 33) / 100) {
//             setIsWidthInRange(1);
//         } else {
//             setIsWidthInRange(3);
//         }
//     };

//     useEffect(() => {
//         // Gắn sự kiện lắng nghe sự thay đổi chiều rộng
//         window.addEventListener('resize', handleResize);

//         // Lần đầu tiên khi tải trang, gọi hàm xử lý
//         handleResize();

//         // Làm sạch sự kiện khi component unmount
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const renderColumns = () => {
//         let columns;
//         if (isWidthInRange === 2) {
//             columns = [column4, column5];
//         } else if (isWidthInRange === 3) {
//             columns = [column1, column2, column3];
//         } else {
//             columns = [column6];
//         }
//         return columns.map((column, index) => (
//             <div key={index} className={cx('column')}>
//                 {column}
//             </div>
//         ));
//     };

//     const column1 = [];
//     const column2 = [];
//     const column3 = [];
//     const column4 = [];
//     const column5 = [];
//     const column6 = [];

//     let height1 = 0;
//     let height2 = 0;
//     let height3 = 0;
//     let height4 = 0;
//     let height5 = 0;

//     data &&
//         data.forEach((photo) => {
//             if (isWidthInRange === 2) {
//                 const { heightPX: calculatedHeight } = calculateImageSize({
//                     photo: photo,
//                     width: 48,
//                 });
//                 let smallestHeight = Math.min(height4, height5);
//                 if (height4 === smallestHeight) {
//                     column4.push(<PhotoHover key={photo.id} data={photo} hardWidthVW={48} check={check} />);
//                     height4 += Math.floor(calculatedHeight);
//                 } else {
//                     column5.push(<PhotoHover key={photo.id} data={photo} hardWidthVW={48} check={check} />);
//                     height5 += Math.floor(calculatedHeight);
//                 }
//             } else if (isWidthInRange === 3) {
//                 const { heightPX: calculatedHeight } = calculateImageSize({
//                     photo: photo,
//                     width: 32,
//                 });
//                 let smallestHeight = Math.min(height1, height2, height3);
//                 if (height1 === smallestHeight) {
//                     column1.push(<PhotoHover key={photo.id} data={photo} hardWidthVW={32} check={check} />);
//                     height1 += Math.floor(calculatedHeight);
//                 } else if (height2 === smallestHeight) {
//                     column2.push(<PhotoHover key={photo.id} data={photo} hardWidthVW={32} check={check} />);
//                     height2 += Math.floor(calculatedHeight);
//                 } else {
//                     column3.push(<PhotoHover key={photo.id} data={photo} hardWidthVW={32} check={check} />);
//                     height3 += Math.floor(calculatedHeight);
//                 }
//             } else {
//                 column6.push(<PhotoHover key={photo.id} data={photo} hardWidthVW={97} check={check} />);
//             }
//         });

//     return <div className={cx('row')}>{renderColumns()}</div>;
// }

export default PhotoList;
