import classNames from 'classnames/bind';
import styles from './CollectionCard.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import CollectionPhoto from '../CollectionPhoto';

const cx = classNames.bind(styles);

function CollectionCard({ collection }) {
    let slicedTag;

    if (collection.tags.length < 3) {
        slicedTag = collection.tags.slice(0, collection.tags.length);
    } else {
        slicedTag = collection.tags.slice(0, 3);
    }

    return (
        <div className={cx('collection-card-wrapper')}>
            <Link to={config.routes.collection(`${collection.id}`)}>
                <CollectionPhoto data={collection.preview_photos} />
            </Link>
            <div className={cx('collection-card-info')}>
                <span>{collection.title}</span>
                <span>{collection.total_photos} photos</span>
            </div>
            <div className={cx('detail-tags')}>
                {slicedTag.map((tag) => (
                    <Link
                        to={config.routes.search({ searchId: tag.title, value: 'photos' })}
                        key={tag.title}
                        className={cx('tags')}
                        onClick={() => window.scrollTo({ top: 0 })}
                    >
                        {tag.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CollectionCard;
