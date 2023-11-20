import classNames from 'classnames/bind';
import styles from './DetailPhoto.module.scss';

import { useParams } from 'react-router-dom';
import { PhotoItem } from '~/components/PhotoItem';
import { CollectionCard } from '~/components/CollectionCard';
import { PhotoList } from '~/components/PhotoList';
import DetailPhotoUser from './DetailPhotoUser';
import DetailPhotoInfo from './DetailPhotoInfo';
import { usePhoto, useSearch, useUserCollection } from '~/unsplash/hooks';
import { useState } from 'react';
import { LockIcon, PlusIcon, UnLockIcon } from '~/components/Icons';
import { CollectionForm, Popup } from '~/components/Popup';
import { useResize } from '~/hooks';
import { loginWithUnsplash } from '~/unsplash/utils/token';
import { Loading } from '~/components/Loading';

const cx = classNames.bind(styles);

function DetailPhoto() {
    const params = useParams();
    const id = params.id.slice(0, params.id.length);

    const [popupVisible, setPopupVisible] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const { changeStyle } = useResize({ size: 66 });

    const shouldRender = localStorage.getItem('currentId') !== null;

    const handleOpenPopup = () => {
        if (!shouldRender) {
            window.location = loginWithUnsplash();
            return null;
        }
        setPopupVisible('add');
    };

    const handleLike = () => {
        if (!shouldRender) {
            window.location = loginWithUnsplash();
            return null;
        }
        like();
    };

    const { data: photo, loading: photoLoading, setData, like } = usePhoto({ id });

    const { data: listPhoto, loading: listPhotoLoading } = useSearch({
        query: photo ? photo.tags[0].title : '',
        per_page: 12,
    });

    const {
        data: collections,
        loading: collectionLoading,
        add,
        create,
    } = useUserCollection({
        username: localStorage.getItem('currentId'),
    });

    const handleAddToCollection = (collection) => {
        add({ collection: collection, photo: photo, setPhoto: setData });
    };

    const handleCreate = () => {
        create({
            title: name,
            description: description,
            private: checkbox,
        });
        setPopupVisible('add');
    };

    if (photoLoading || listPhotoLoading || collectionLoading || !photo || !collections || !listPhoto) {
        return <Loading />;
    }
    return (
        <div className={cx('detail-wrapper')}>
            <DetailPhotoUser photo={photo} handleLike={handleLike} handleOpenPopup={handleOpenPopup} />
            <div className={cx('detail-content')}>
                <div className={cx('content-photo')}>
                    <PhotoItem data={photo} hardWidthVW={changeStyle ? 100 : 50} />
                </div>
                <DetailPhotoInfo photo={photo} />
            </div>
            <div className={cx('detail-related-photos')}>
                <span>Related Photos</span>
                <div className={cx('related-photos')}>
                    <PhotoList data={listPhoto.results} />
                </div>
            </div>
            <div className={cx('detail-related-collections')}>
                <span className={cx('related_collections-title')}>Related Collections</span>
                <div className={cx('related-collections')}>
                    {photo.related_collections.results.map((collection) => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
                </div>
            </div>
            <Popup
                expectedPopup={'add'}
                itemPopup={popupVisible}
                setPopupVisible={setPopupVisible}
                changeStyle={changeStyle}
            >
                {!changeStyle && (
                    <PhotoItem data={photo} hardWidthVW={30} hardHeightVH={80} className={'popup-image'} />
                )}
                <div className={cx('popup-action')}>
                    <span>Add Photo To Collection</span>
                    <div className={cx('popup-action-create')} onClick={() => setPopupVisible('create')}>
                        <PlusIcon />
                        <span>Create a new collection</span>
                    </div>

                    {collections.map((collection) => (
                        <div
                            key={collection.id}
                            className={cx(
                                'popup-action-item',
                                photo.current_user_collections.find((item) => item.id === collection.id) && 'active',
                            )}
                            style={{
                                backgroundImage:
                                    collection.cover_photo && `url(${collection.cover_photo.urls.regular})`,
                                backgroundSize: 'cover',
                            }}
                            onClick={() => handleAddToCollection(collection)}
                        >
                            <span className={cx('total-photo')}>{collection.total_photos} photos</span>
                            <div className={cx('title-photo')}>
                                {collection.private ? <LockIcon /> : <UnLockIcon />}
                                <span>{collection.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Popup>
            <Popup
                expectedPopup={'create'}
                itemPopup={popupVisible}
                setPopupVisible={setPopupVisible}
                changeStyle={changeStyle}
            >
                {!changeStyle && (
                    <PhotoItem data={photo} hardWidthVW={30} hardHeightVH={80} className={'popup-image'} />
                )}
                <div className={cx('popup-action')}>
                    <CollectionForm
                        title={'Create Collection'}
                        name={name}
                        setName={setName}
                        description={description}
                        setDescription={setDescription}
                        checkbox={checkbox}
                        setCheckbox={setCheckbox}
                    >
                        <>
                            <button className={cx('btn-cancel')} onClick={() => setPopupVisible('add')}>
                                Cancel
                            </button>
                            <button className={cx('btn-create')} onClick={handleCreate}>
                                Create
                            </button>
                        </>
                    </CollectionForm>
                </div>
            </Popup>
        </div>
    );
}

export default DetailPhoto;
