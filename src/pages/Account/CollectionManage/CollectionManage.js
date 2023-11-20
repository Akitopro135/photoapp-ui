import classNames from 'classnames/bind';
import styles from './CollectionManage.module.scss';
import { useUserCollection } from '~/unsplash/hooks';
import { LockIcon, UnLockIcon } from '~/components/Icons';
import { useState } from 'react';
import { Loading } from '~/components/Loading';
import { useResize } from '~/hooks';
import { CollectionForm, Popup } from '~/components/Popup';

const cx = classNames.bind(styles);

function CollectionManage() {
    const [searchValue, setSearchValue] = useState('');

    const [deleteVisible, setDeleteVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState('');
    const [popupItem, setPopupItem] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const {
        data: collections,
        loading,
        remove,
        update,
    } = useUserCollection({
        username: localStorage.getItem('currentId'),
    });

    const { changeStyle } = useResize({ size: 69 });

    const handlePopup = (collection) => {
        setPopupVisible('update');
        setPopupItem(collection);

        setName(collection.title);
        collection.description ? setDescription(collection.description) : setDescription('');
        setCheckbox(collection.private);
    };

    const handleUpdate = (collection) => {
        update(collection.id, {
            title: name,
            description: description,
            private: checkbox,
        });
        setPopupVisible('');
    };

    const handleRemove = (collection) => {
        remove(collection.id);
        setPopupVisible('');
        setDeleteVisible(false);
    };

    if (loading) {
        return <Loading />;
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search', changeStyle && 'resize')}>
                <h1>Collections Manage</h1>
                <input
                    type="text"
                    placeholder="Search Collection..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            {collections
                .filter((collection) => collection.title.toLowerCase().includes(searchValue.toLowerCase()))
                .map((collection) => (
                    <div
                        key={collection.id}
                        className={cx('collection')}
                        style={{
                            backgroundImage: collection.cover_photo && `url(${collection.cover_photo.urls.regular})`,
                            backgroundSize: 'cover',
                        }}
                        onClick={() => handlePopup(collection)}
                    >
                        <span className={cx('total-photo')}>{collection.total_photos} photos</span>
                        <div className={cx('title-photo')}>
                            {collection.private ? <LockIcon /> : <UnLockIcon />}
                            <span>{collection.title}</span>
                        </div>
                    </div>
                ))}
            {popupVisible && (
                <Popup
                    expectedPopup={'update'}
                    itemPopup={popupVisible}
                    setPopupVisible={setPopupVisible}
                    changeStyle={changeStyle}
                >
                    <div className={cx('popup-action')}>
                        <CollectionForm
                            title={'Update Collection'}
                            name={name}
                            setName={setName}
                            description={description}
                            setDescription={setDescription}
                            checkbox={checkbox}
                            setCheckbox={setCheckbox}
                        >
                            {deleteVisible ? (
                                <>
                                    <div className={cx('delete-confirm')}>
                                        <span>Delete confirm?</span>
                                        <button className={cx('btn-cancel')} onClick={() => setDeleteVisible(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                    <button className={cx('btn-delete-action')} onClick={() => handleRemove(popupItem)}>
                                        Delete Collection
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className={cx('btn-delete')} onClick={() => setDeleteVisible(true)}>
                                        Delete Collection
                                    </button>
                                    <button className={cx('btn-update')} onClick={() => handleUpdate(popupItem)}>
                                        Update
                                    </button>
                                </>
                            )}
                        </CollectionForm>
                    </div>
                </Popup>
            )}
        </div>
    );
}

export default CollectionManage;
