import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useState } from 'react';
import { getRandomPhoto, getPhoto, getSearch } from '~/services/searchServices';

import PhotoItem from '~/components/PhotoItem';
import CollectionPhoto from '~/components/CollectionPhoto';
import ListPhoto from './ListPhoto';

const cx = classNames.bind(styles);
const list = ['Sea', 'Cat', 'Dog', 'Earth', 'Galaxy'];
let random;

function Home() {
    const [photo, setPhoto] = useState();
    const [listTopPhoto, setListTopPhoto] = useState([]);
    const [listSeaPhoto, setListSeaPhoto] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const photo = await getRandomPhoto();
            setPhoto(photo);
            const listTop = await getPhoto(Math.floor(Math.random() * 20), 6, 'popular');
            setListTopPhoto(listTop);
            random = await Math.floor(Math.random() * list.length);
            console.log(random);
            const listSea = await getSearch(list[random], Math.floor(Math.random() * 20), 6);
            console.log(listSea);
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
                        <span>{photo.alt_description.toUpperCase()}</span>
                    </div>
                </div>
            )}
            <ListPhoto data={listTopPhoto} title={'Top'} morePhoto={false} />
            <ListPhoto data={listSeaPhoto} title={list[random]} morePhoto={true} />
            {listSeaPhoto[0] && (
                <div className={cx('collection-image')}>
                    <div>
                        <span>Collection</span>
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
