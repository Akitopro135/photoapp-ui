import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useTopic, useTopicList } from '~/hooks';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import config from '~/config';
import PhotoItem from '~/components/PhotoItem';

const cx = classNames.bind(styles);

function Sidebar() {
    const params = useParams();
    const topicIdOrSlug =
        Object.keys(params).length !== 0 &&
        params.topicIdOrSlug &&
        params.topicIdOrSlug.slice(0, params.topicIdOrSlug.length);

    const { data: topic } = useTopic({
        topicIdOrSlug: topicIdOrSlug,
        check: params.topicIdOrSlug,
    });

    const [activeItem, setActiveItem] = useState(''); // Sử dụng biến state để theo dõi mục đang ở trạng thái active
    const { data } = useTopicList({});

    useEffect(() => {
        if (params.topicIdOrSlug && topic.length !== 0) {
            setActiveItem(topic);
        }
    }, [topic]);

    const toggleItem = (item) => {
        setActiveItem(item);
    };

    return (
        <div className={cx('sidebar-wrapper')}>
            <div className={cx('sidebar-items')}>
                {data.results &&
                    data.results.map((item) => (
                        <Link
                            key={item.id}
                            to={config.routes.topic(`${item.slug}`)}
                            className={cx('items', activeItem.slug === item.slug && params.topicIdOrSlug && 'active')}
                            onClick={() => toggleItem(item)}
                        >
                            {item.slug}
                        </Link>
                    ))}
            </div>
            {activeItem && params.topicIdOrSlug && (
                <div className={cx('cover-photo')}>
                    <PhotoItem data={activeItem.cover_photo} hardWidthVW={100} hardHeightVH={60} />
                    <h1>{activeItem.title}</h1>
                    <span>{activeItem.description}</span>
                </div>
            )}
        </div>
    );
}

// function Sidebar() {
//     const [activeItem, setActiveItem] = useState(''); // Sử dụng biến state để theo dõi mục đang ở trạng thái active
//     const { data } = useTopicList({});

//     const toggleItem = (item) => {
//         // Nếu nút đã được bấm và là nút hiện đang ở trạng thái active, hủy trạng thái active
//         if (activeItem.slug === item.slug) {
//             setActiveItem('');
//         } else {
//             // Nếu không phải, cập nhật nút đang ở trạng thái active thành nút mới
//             setActiveItem(item);
//         }
//     };

//     return (
//         <div className={cx('sidebar-wrapper')}>
//             <div className={cx('sidebar-items')}>
//                 {data.results &&
//                     data.results.map((item) => (
//                         <Link
//                             key={item.id}
//                             to={config.routes.topic(`${item.slug}`)}
//                             className={cx('items', activeItem.slug === item.slug && 'active')}
//                             onClick={() => toggleItem(item)}
//                         >
//                             {item.slug}
//                         </Link>
//                     ))}
//             </div>
//             {activeItem && (
//                 <div>
//                     <PhotoItem data={activeItem.cover_photo} widthPC={100} />
//                 </div>
//             )}
//         </div>
//     );
// }

export default Sidebar;
