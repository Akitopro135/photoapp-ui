import { useEffect, useState } from 'react';

function useResize({ size = 50 }) {
    const [changeStyle, setChangeStyle] = useState(false);

    const handleResize = () => {
        if ((window.screen.width * size) / 100 >= window.innerWidth) {
            setChangeStyle(true);
        } else {
            setChangeStyle(false);
        }
    };

    useEffect(() => {
        // Gắn sự kiện lắng nghe sự thay đổi chiều rộng
        window.addEventListener('resize', handleResize);

        // Lần đầu tiên khi tải trang, gọi hàm xử lý
        handleResize();

        // Làm sạch sự kiện khi component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        changeStyle,
    };
}

export default useResize;
