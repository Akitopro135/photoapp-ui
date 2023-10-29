import classNames from 'classnames/bind';
import styles from './Topic.module.scss';
import { useTopicPhotos } from '~/unsplash/hooks';
import { useLoadMore } from '~/hooks';
import { PhotoList } from '~/components/PhotoList';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Topic() {
    const params = useParams();
    const { loadMoreData } = useLoadMore({
        checkScroll: true,
        fetchDatas: useTopicPhotos,
        fetchDatasProps: {
            id_or_slug: params.topicIdOrSlug,
            per_page: 12,
        },
    });

    return (
        <div className={cx('wrapper')}>
            <PhotoList data={loadMoreData} />
        </div>
    );
}

export default Topic;
