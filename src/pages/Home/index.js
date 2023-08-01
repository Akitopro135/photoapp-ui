import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useState } from 'react';
import { getRandomPhoto, getPhoto, getSearch } from '~/services/searchServices';

import PhotoItem from '~/components/PhotoItem';
import { AngleLeft, AngleRight } from '~/components/Icons';
import CollectionPhoto from '~/components/CollectionPhoto';

const cx = classNames.bind(styles);

function Home() {
    const [photo, setPhoto] = useState();
    const [active, setActive] = useState('');
    const [changeTopImage, setChangeTopImage] = useState(true);
    const [changeSeaImage, setChangeSeaImage] = useState(true);
    const [listTopPhoto, setListTopPhoto] = useState([]);
    const [listSeaPhoto, setListSeaPhoto] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const photo = await getRandomPhoto();
            setPhoto(photo);
            const listTop = await getPhoto(Math.floor(Math.random() * 20), 6, 'popular');
            console.log(listTop);
            setListTopPhoto(listTop);
            const listSea = await getSearch('sea', Math.floor(Math.random() * 20), 6);
            setListSeaPhoto(listSea);
        };

        fetchApi();
    }, []);

    const hangleChangeTopImage = () => {
        //setTimeout(() => {
        setChangeTopImage(changeTopImage ? false : true);
        //     setActive('');
        // }, 500);
        //moveRight();
    };

    const hangleChangeSeaImage = () => {
        setChangeSeaImage(changeSeaImage ? false : true);
    };

    const moveRight = () => {
        setActive('active');
    };

    return (
        <div className={cx('wrapper')}>
            {photo && (
                <div className={cx('introduct')}>
                    <div className={cx('image')}>
                        <PhotoItem data={photo} className={'home-introduct-image'} />
                    </div>
                    <div>
                        <h1>{photo.alt_description.toUpperCase()}</h1>
                    </div>
                </div>
            )}
            {listTopPhoto[0] && (
                <div className={cx('top-image')}>
                    <div>
                        <h1>Top Image</h1>
                    </div>
                    <div className={cx('top-image-body')}>
                        <button className={cx('angle-btn')} onClick={hangleChangeTopImage}>
                            <AngleLeft />
                        </button>
                        {changeTopImage ? (
                            <>
                                <PhotoItem data={listTopPhoto[0]} className={'home-introduct-image'} />
                                <PhotoItem data={listTopPhoto[1]} className={'home-introduct-image'} />
                                <PhotoItem data={listTopPhoto[2]} className={'home-introduct-image'} />
                            </>
                        ) : (
                            <>
                                <PhotoItem data={listTopPhoto[3]} className={'home-introduct-image'} />
                                <PhotoItem data={listTopPhoto[4]} className={'home-introduct-image'} />
                                <PhotoItem data={listTopPhoto[5]} className={'home-introduct-image'} />
                            </>
                        )}
                        <button className={cx('angle-btn')} onClick={hangleChangeTopImage}>
                            <AngleRight />
                        </button>
                    </div>
                </div>
            )}
            {listSeaPhoto[0] && (
                <div className={cx('sea-image')}>
                    <div>
                        <h1>Sea Image</h1>
                    </div>
                    <div className={cx('sea-image-body')}>
                        <button className={cx('angle-btn')} onClick={hangleChangeSeaImage}>
                            <AngleLeft />
                        </button>
                        {changeSeaImage ? (
                            <>
                                <PhotoItem data={listSeaPhoto[0]} className={'home-introduct-image'} />
                                <PhotoItem data={listSeaPhoto[1]} className={'home-introduct-image'} />
                                <PhotoItem data={listSeaPhoto[2]} className={'home-introduct-image'} />
                            </>
                        ) : (
                            <>
                                <PhotoItem data={listSeaPhoto[3]} className={'home-introduct-image'} />
                                <PhotoItem data={listSeaPhoto[4]} className={'home-introduct-image'} />
                                <PhotoItem data={listSeaPhoto[5]} className={'home-introduct-image'} />
                            </>
                        )}
                        <button className={cx('angle-btn')} onClick={hangleChangeSeaImage}>
                            <AngleRight />
                        </button>
                    </div>
                </div>
            )}
            <div className={cx('collection-image')}>
                <div>
                    <h1>Collection</h1>
                </div>
                <div className={cx('collection-image-body')}>
                    <CollectionPhoto data={listSeaPhoto} />
                    <CollectionPhoto data={listSeaPhoto} />
                    <CollectionPhoto data={listSeaPhoto} />
                </div>
            </div>
        </div>
    );
}

export default Home;
