import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useState } from 'react';
import { getRandomPhoto, getPhoto, getSearch } from '~/services/searchServices';
import PhotoItem from '~/components/PhotoItem';

const cx = classNames.bind(styles);

function Home() {
    const [photo, setPhoto] = useState();
    const [listTopPhoto, setListTopPhoto] = useState([]);
    const [listSeaPhoto, setListSeaPhoto] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const photo = await getRandomPhoto();
            setPhoto(photo);

            const listTop = await getPhoto(Math.floor(Math.random() * 20), 3, 'popular');
            setListTopPhoto(listTop);

            const listSea = await getSearch('sea', Math.floor(Math.random() * 20), 3, 'popular');
            setListSeaPhoto(listSea);
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {photo && (
                <div className={cx('introduct')}>
                    <div className={cx('image')}>
                        <PhotoItem data={photo} className={'home-introduct-image'} />
                    </div>
                    <div>
                        <h1>{photo.alt_description.toUpperCase()}</h1>
                        <h2>Test</h2>
                    </div>
                </div>
            )}
            <div className={cx('top-image')}>
                <div>
                    <h1>Top Image</h1>
                </div>
                <div className={cx('top-image-body')}>
                    {listTopPhoto.map((photo) => (
                        <PhotoItem key={photo.id} data={photo} className={'home-introduct-image'} />
                    ))}
                </div>
            </div>
            <div className={cx('sea-image')}>
                <div>
                    <h1>Sea Image</h1>
                </div>
                <div className={cx('sea-image-body')}>
                    {listSeaPhoto.map((photo) => (
                        <PhotoItem key={photo.id} data={photo} className={'home-introduct-image'} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
