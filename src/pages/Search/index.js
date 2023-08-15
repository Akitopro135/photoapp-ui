import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import PhotoItem from '~/components/PhotoItem';
import { useSearch } from '~/hooks';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const params = useParams();
    const searchValue = params.searchId.slice(0, params.searchId.length);

    const { listPhoto } = useSearch({
        query: searchValue,
        perPage: 12,
    });

    return (
        <div className={cx('wrapper')}>
            {listPhoto.map((photo) => (
                <PhotoItem key={photo.id} data={photo} className={'card-search'} info button profileImage popUp />
            ))}
        </div>
    );
}

export default Search;
