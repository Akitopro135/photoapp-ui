import { useEffect, useRef, useState } from 'react';

function useScroll() {
    const [scrollY, setScrollY] = useState(0);
    const page = useRef(1);
    const scroll = 500;

    useEffect(() => {
        const handleScroll = () => {
            const newScrollY = window.scrollY;
            if (newScrollY > scrollY + scroll) {
                page.current += 1;
                setScrollY(newScrollY + window.innerHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollY]);

    return {
        page,
        scrollY,
    };
}

export default useScroll;
