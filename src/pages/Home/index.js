import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useState } from 'react';
import { getRandomPhoto, getPhoto, getSearch } from '~/services/searchServices';

import PhotoItem from '~/components/PhotoItem';
import CollectionPhoto from '~/components/CollectionPhoto';
import ListPhoto from './ListPhoto';

const cx = classNames.bind(styles);

function Home() {
    const [photo, setPhoto] = useState();
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

    return (
        <div className={cx('wrapper')}>
            {photo && (
                <div className={cx('introduct')}>
                    <div className={cx('image')}>
                        <PhotoItem data={photo} classNameImage={'home-introduct-image'} />
                    </div>
                    <div>
                        <h1>{photo.alt_description.toUpperCase()}</h1>
                    </div>
                </div>
            )}
            <ListPhoto data={listTopPhoto} title={'Top Image'} />
            <ListPhoto data={listSeaPhoto} title={'Sea Image'} />
            {listSeaPhoto[0] && (
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
            )}
        </div>
    );
}

export default Home;
