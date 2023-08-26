// import { useSearch } from '~/hooks';
// import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function useScroll() {
    // const params = useParams();
    // const searchValue = params.searchId.slice(0, params.searchId.length);

    const [scrollY, setScrollY] = useState(0);
    const [scroll, setScroll] = useState(400); // Đã thay đổi giá trị mặc định
    const page = useRef(1);
    // const [photos, setPhotos] = useState([]);

    // const { listPhoto } = useSearch({
    //     query: searchValue,
    //     perPage: 12,
    //     page: page,
    // });

    useEffect(() => {
        const handleScroll = () => {
            const newScrollY = window.scrollY;
            if (newScrollY > scrollY + scroll) {
                // Kiểm tra khoảng cách cuộn
                page.current += 1;
                setScrollY(newScrollY);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollY]);

    // useEffect(() => {
    //     if (listPhoto.length === 0) {
    //         setPhotos(listPhoto);
    //     } else {
    //         const newPhotos = listPhoto.filter((photo) => !photos.some((p) => p.id === photo.id));
    //         setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    //     }
    // }, [page]);

    return {
        // photos,
        page,
        scrollY,
    };
}

export default useScroll;
