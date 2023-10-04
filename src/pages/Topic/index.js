import classNames from 'classnames/bind';
import styles from './Topic.module.scss';
import { useLoadMore, useTopicPhotos } from '~/hooks';
import PhotoList from '~/components/PhotoList';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Topic() {
    const params = useParams();

    const { loadMoreData } = useLoadMore({
        checkScroll: true,
        fetchDatas: useTopicPhotos,
        fetchDatasProps: {
            topicIdOrSlug: params.topicIdOrSlug,
            perPage: 12,
        },
    });

    return (
        <div className={cx('wrapper')}>
            <PhotoList data={loadMoreData} widthPC={30} />
        </div>
    );
}

export default Topic;
