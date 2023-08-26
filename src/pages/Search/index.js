import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import PhotoCard from '~/components/PhotoCard';
import { useScroll } from '~/hooks';
import { useSearch } from '~/hooks';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Search() {
    const params = useParams();
    const searchValue = params.searchId.slice(0, params.searchId.length);

    const [photos, setPhotos] = useState([]);

    const { page } = useScroll();

    const { listPhoto } = useSearch({
        query: searchValue,
        perPage: 12,
        page: page.current,
    });

    useEffect(() => {
        if (listPhoto.length > 0) {
            // Thêm listPhoto vào photos chỉ khi page = 1 hoặc photos chưa có dữ liệu
            if (page.current === 1 || photos.length === 0) {
                setPhotos(listPhoto);
            } else {
                const newPhotos = listPhoto.filter((photo) => !photos.some((p) => p.id === photo.id));
                setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
            }
        }
    }, [listPhoto]);

    return (
        <div className={cx('wrapper')}>
            {photos.length > 0 &&
                photos.map((photo) => (
                    <PhotoCard key={photo.id} data={photo} className={'search'} card info button profileImage popUp />
                ))}
        </div>
    );
}

export default Search;
