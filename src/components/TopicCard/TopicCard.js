import classNames from 'classnames/bind';
import styles from './TopicCard.module.scss';
import { PhotoItem } from '../PhotoItem';
import { formatNumber } from '~/helpers';
import { ImageIcon } from '../Icons';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function TopicCard({ topic, width, height, className }) {
    return (
        <div
            className={cx('wrapper')}
            onClick={() => (window.location = config.routes.topic({ topicIdOrSlug: topic.slug }))}
        >
            <div className={cx('header')}>
                <PhotoItem data={topic.cover_photo} className={className} hardWidthVW={width} hardHeightVH={height} />
            </div>
            <div className={cx('body')}>
                <div className={cx('header')}>
                    <div className={cx('info')}>
                        <span className={cx('title')}>{topic.title}</span>
                        <Link
                            id="RouterNavLink1"
                            to={config.routes.user({ userName: topic.owners[0].username, value: 'photos' })}
                            className={cx('user')}
                        >
                            {topic.owners[0].name}
                        </Link>
                    </div>
                    <Link
                        id="RouterNavLink2"
                        to={config.routes.user({ userName: topic.owners[0].username, value: 'photos' })}
                    >
                        <img src={topic.owners[0].profile_image.medium} className={cx('profile-image')} alt="" />
                    </Link>
                </div>
                <span className={cx('description')}>{topic.description}</span>
                <div className={cx('total-photos')}>
                    <ImageIcon />
                    {formatNumber(topic.total_photos)} contributions
                </div>
            </div>
        </div>
    );
}

export default TopicCard;
