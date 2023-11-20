import classNames from 'classnames/bind';
import styles from './Topics.module.scss';

import { useTopicList } from '~/unsplash/hooks';
import { TopicCard } from '~/components/TopicCard';
import { Loading } from '~/components/Loading';

const cx = classNames.bind(styles);

function Topics() {
    const { data, loading } = useTopicList({});

    if (loading) {
        return <Loading />;
    }
    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Topics</span>
            <span className={cx('description')}>
                Explore the world through topics of beautiful photos free to use under the
            </span>
            <div className={cx('topics-wrapper')}>
                {data.map((topic) => (
                    <TopicCard key={topic.id} topic={topic} width={24} height={30} className={'topic-photo'} />
                ))}
            </div>
        </div>
    );
}

export default Topics;
