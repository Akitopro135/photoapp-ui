import { useEffect } from 'react';
function useHeaderScroll({ wrapperOfItem, itemKeep, spaceBetweenItemAndSidebar = [] }) {
    const rootStyles = getComputedStyle(document.documentElement);
    const defaultLayoutHeaderHeight = rootStyles.getPropertyValue('--default-layout-header-height');
    const sidebarHeight = rootStyles.getPropertyValue('--sidebar-height');

    useEffect(() => {
        const handleScroll = () => {
            // Kiểm tra xem spaceBetweenItemAndSidebar có tồn tại và có độ dài lớn hơn 0
            const hasSpaceItem = spaceBetweenItemAndSidebar && spaceBetweenItemAndSidebar.length > 0;

            // Tính toán firstChildHeight dựa trên spaceBetweenItemAndSidebar (nếu có) hoặc mặc định là 0
            const firstChildHeight = hasSpaceItem ? spaceBetweenItemAndSidebar[0].offsetHeight : 0;

            if (window.scrollY > firstChildHeight + parseInt(sidebarHeight)) {
                itemKeep[0].style.position = 'fixed';
                itemKeep[0].style.top = defaultLayoutHeaderHeight;
                wrapperOfItem[0].style.marginTop = defaultLayoutHeaderHeight;
            } else if (window.scrollY > 0 && itemKeep[0].style.position === 'fixed') {
                itemKeep[0].style.top = `${
                    parseInt(defaultLayoutHeaderHeight) + parseInt(sidebarHeight) + firstChildHeight - window.scrollY
                }px`;
            } else {
                itemKeep[0].style.position = 'relative';
                itemKeep[0].style.top = '0px';
                wrapperOfItem[0].style.marginTop = '0px';
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return null;
}

// export function useHeaderScroll({ wrapperOfItem, itemKeep }) {
//     const rootStyles = getComputedStyle(document.documentElement);
//     const defaultLayoutHeaderHeight = rootStyles.getPropertyValue('--default-layout-header-height');

//     //let setTop = itemKeep[0].offsetTop;

//     // const element = document.getElementsByClassName(itemKeep);
//     // const test = document.getElementsByClassName(wrapperOfItem);

//     let setTop;
//     if (itemKeep.length > 0 && wrapperOfItem.length > 0) {
//         setTop = itemKeep[0].offsetTop;
//     }

//     useEffect(() => {
//         if (setTop - parseInt(defaultLayoutHeaderHeight) <= 0) return;
//         const handleScroll = () => {
//             if (window.scrollY > setTop - parseInt(defaultLayoutHeaderHeight)) {
//                 itemKeep[0].style.position = 'fixed';
//                 itemKeep[0].style.top = defaultLayoutHeaderHeight;
//                 wrapperOfItem[0].style.marginTop = defaultLayoutHeaderHeight;
//             } else if (window.scrollY > 0 && itemKeep[0].style.position === 'fixed') {
//                 itemKeep[0].style.top = `${setTop - window.scrollY}px`;
//             } else {
//                 itemKeep[0].style.position = 'relative';
//                 itemKeep[0].style.top = '0px';
//                 wrapperOfItem[0].style.marginTop = '0px';
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, [setTop]);

//     return null;
// }

export default useHeaderScroll;
