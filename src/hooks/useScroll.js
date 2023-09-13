import { useEffect, useState, useRef } from 'react';

// function useScroll(height = 0) {
//     const [scrollY, setScrollY] = useState(0);
//     const [page, setPage] = useState(1);
//     const scroll = 500 + height;

//     useEffect(() => {
//         const handleScroll = () => {
//             const newScrollY = window.scrollY;
//             if (newScrollY > scrollY + scroll) {
//                 setTimeout(() => {
//                     setPage((page) => page + 1);
//                     setScrollY(newScrollY + window.innerHeight);
//                 }, 2000);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, [scrollY]);

//     return {
//         page,
//         scrollY,
//     };
// }

function useScroll({ scrollThreshold = 500, checkScroll = true }) {
    const [scrollY, setScrollY] = useState(0);
    const [page, setPage] = useState(1);
    const isScrolling = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            const newScrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;

            // Kiểm tra khi nào cuộn đến ngưỡng
            if (checkScroll && !isScrolling.current && newScrollY + windowHeight >= pageHeight - scrollThreshold) {
                isScrolling.current = true;
                setTimeout(() => {
                    setPage(page + 1);
                    isScrolling.current = false;
                }, 2000);

                setScrollY(newScrollY);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollY, checkScroll]);

    return {
        page,
        scrollY,
    };
}

export default useScroll;
