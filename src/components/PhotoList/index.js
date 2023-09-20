import classNames from 'classnames/bind';
import styles from './PhotoList.module.scss';
import { useEffect, useState } from 'react';
import images from '~/assets/images';
import { PhotoHover } from '../PhotoCard';

const cx = classNames.bind(styles);

// function PhotoList({ data }) {
//     const [columns1, setColumns1] = useState([]);
//     const [columns2, setColumns2] = useState([]);
//     const [columns3, setColumns3] = useState([]);

//     useEffect(() => {}, []);

//     return (
//         <>
//             {columns1 && (
//                 <div className={cx('row')}>
//                     <div className={cx('column')}>
//                         <img src={images.background} alt="" style={{ width: 500, height: 1000 }} />
//                         <img src={images.background} alt="" style={{ width: 500, height: 500 }} />
//                         <img src={images.background} alt="" style={{ width: 500, height: 500 }} />
//                         <img src={images.background} alt="" style={{ width: 500, height: 1000 }} />
//                     </div>
//                     <div className={cx('column')}>
//                         <img src={images.background} alt="" style={{ width: 500, height: 500 }} />
//                         <img src={images.background} alt="" style={{ width: 500, height: 1000 }} />
//                         <img src={images.background} alt="" style={{ width: 500, height: 500 }} />
//                         <img src={images.background} alt="" style={{ width: 500, height: 1000 }} />
//                     </div>
//                     <div className={cx('column')}>
//                         <img src={images.background} alt="" style={{ width: 500, height: 1000 }} />
//                         <img src={images.background} alt="" style={{ width: 500, height: 1000 }} />
//                         <img src={images.background} alt="" style={{ width: 500, height: 500 }} />
//                         <img src={images.background} alt="" style={{ width: 500, height: 500 }} />
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

function PhotoList({ data, width }) {
    // Khởi tạo các mảng chứa ảnh cho từng cột
    const column1 = [];
    const column2 = [];
    const column3 = [];

    // Duyệt qua danh sách ảnh trong data
    data &&
        data.forEach((photo, index) => {
            // Dựa vào số thứ tự (index % 3) để quyết định cột tương ứng
            if (index % 3 === 0) {
                column3.push(<PhotoHover key={photo.id} data={photo} width={width} />);
            } else if (index % 3 === 1) {
                column1.push(<PhotoHover key={photo.id} data={photo} width={width} />);
            } else {
                column2.push(<PhotoHover key={photo.id} data={photo} width={width} />);
            }
        });

    return (
        <div className={cx('row')}>
            <div className={cx('column')}>{column1}</div>
            <div className={cx('column')}>{column2}</div>
            <div className={cx('column')}>{column3}</div>
        </div>
    );
}

export default PhotoList;
