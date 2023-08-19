import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import PhotoItem from '~/components/PhotoItem';
import CollectionPhoto from '~/components/CollectionPhoto';
import ListPhoto from './ListPhoto';
import { useSearch, useRandomPhoto, useList } from '~/hooks';
import { calculateImageSize } from '~/helpers';

const cx = classNames.bind(styles);

function Home() {
    const { listPhoto: listSea } = useSearch({
        query: 'sea',
        page: Math.floor(Math.random() * 20),
        perPage: 6,
    });
    const { listPhoto: listTop } = useList({
        page: Math.floor(Math.random() * 20),
        perPage: 6,
    });
    const { photo } = useRandomPhoto();

    const { calculatedWidth, calculatedHeight } = calculateImageSize(photo ? photo : 500, '');

    return (
        <div className={cx('wrapper')}>
            {photo && (
                <div className={cx('introduct')}>
                    <div className={cx('image')}>
                        <PhotoItem data={photo} width={calculatedWidth} height={calculatedHeight} />
                    </div>
                    <div>
                        <span>{photo.alt_description.toUpperCase()}</span>
                    </div>
                </div>
            )}
            {listTop[0] && <ListPhoto data={listTop} className={'home'} title={'Top'} morePhoto={false} />}
            {listSea[0] && <ListPhoto data={listSea} className={'search'} title={'Sea'} morePhoto={true} />}
            {listSea[0] && (
                <div className={cx('collection-image')}>
                    <div>
                        <span>Collection</span>
                    </div>
                    <div className={cx('collection-image-body')}>
                        <CollectionPhoto data={listSea} />
                        <CollectionPhoto data={listSea} />
                        <CollectionPhoto data={listSea} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
