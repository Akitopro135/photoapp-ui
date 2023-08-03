import classNames from 'classnames/bind';
import styles from './ListPhoto.module.scss';
import { useState } from 'react';
import { AngleLeft, AngleRight } from '~/components/Icons';
import PhotoItem from '~/components/PhotoItem';

const cx = classNames.bind(styles);

function ListPhoto({ data, title }) {
    const [changeImage, setChangeImage] = useState(true);
    const [active, setActive] = useState('');

    const hangleChangeImage = () => {
        //setTimeout(() => {
        setChangeImage(changeImage ? false : true);
        //     setActive('');
        // }, 500);
        //moveRight();
    };

    const moveRight = () => {
        setActive('active');
    };

    return (
        data[0] && (
            <div className={cx('wrapper-list')}>
                <div>
                    <h1>{title}</h1>
                </div>
                <div className={cx('list-body')}>
                    <button className={cx('angle-btn')} onClick={hangleChangeImage}>
                        <AngleLeft />
                    </button>
                    {changeImage ? (
                        <>
                            <PhotoItem
                                data={data[0]}
                                className={'card'}
                                classNameImage={'list-image'}
                                info
                                button
                                profileImage
                                popUp
                            />
                            <PhotoItem
                                data={data[1]}
                                className={'card'}
                                classNameImage={'list-image'}
                                info
                                button
                                profileImage
                                popUp
                            />
                            <PhotoItem
                                data={data[2]}
                                className={'card'}
                                classNameImage={'list-image'}
                                info
                                button
                                profileImage
                                popUp
                            />
                        </>
                    ) : (
                        <>
                            <PhotoItem
                                data={data[3]}
                                className={'card'}
                                classNameImage={'list-image'}
                                info
                                button
                                profileImage
                                popUp
                            />
                            <PhotoItem
                                data={data[4]}
                                className={'card'}
                                classNameImage={'list-image'}
                                info
                                button
                                profileImage
                                popUp
                            />
                            <PhotoItem
                                data={data[5]}
                                className={'card'}
                                classNameImage={'list-image'}
                                info
                                button
                                profileImage
                                popUp
                            />
                        </>
                    )}
                    <button className={cx('angle-btn')} onClick={hangleChangeImage}>
                        <AngleRight />
                    </button>
                </div>
            </div>
        )
    );
}

export default ListPhoto;
