import { useEffect, useState } from 'react';
import unsplash from '..';
import { ListUserCollectionParams } from '../params/users';
import { CreateCollectionParams, UpdateCollectionParams } from '../params/collections';

function useUserCollection(userInput = ListUserCollectionParams) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getCollections = () => {
        if (loading) return;
        setLoading(true);

        unsplash.user
            .listCollections({
                ...ListUserCollectionParams,
                ...userInput,
            })
            .then((data) => setData(data))
            .catch((error) => {
                console.log('User Page List Collection Error: ' + error);
                setError(error);
            })
            .finally(() => setLoading(false));
    };

    const add = ({ photo, collection, setPhoto }) => {
        if (!data) return;

        if (photo.current_user_collections.find((item) => item.id === collection.id)) {
            unsplash.collection
                .remove({
                    collection_id: collection.id,
                    photo_id: photo.id,
                })
                .then((data) => {
                    setCollection({ oldCollection: collection, newData: data, photo, setPhoto });
                })
                .catch((error) => console.error('Remove Photo From Collection: ', error));
        } else {
            unsplash.collection
                .add({
                    collection_id: collection.id,
                    photo_id: photo.id,
                })
                .then((data) => {
                    setCollection({ oldCollection: collection, newData: data, photo, setPhoto });
                })
                .catch((error) => console.error('Add Photo From Collection: ', error));
        }
    };

    function setCollection({ oldCollection, newData, photo, setPhoto }) {
        if (!data) return;
        const newCollection = [...data]; // Tạo một bản sao mới của mảng data
        const index = newCollection.findIndex((item) => item.id === oldCollection.id);

        if (index !== -1) {
            newCollection[index] = newData.collection; // Thay thế phần tử cũ bằng newCollection
            setData(newCollection); // Cập nhật mảng data
        }

        const newPhoto = {
            ...photo,
            ...newData.photo,
        };
        setPhoto(newPhoto);
    }

    const create = (collectionInput = CreateCollectionParams) => {
        if (!data) return;

        if (collectionInput.title.trim() === '') {
            alert('Must has name');
            return;
        }

        unsplash.collection
            .create({
                ...collectionInput,
            })
            .then((item) => {
                const newData = [...data, item];
                setData(newData);
            })
            .catch((error) => console.error('Create Collection Error: ', error));
    };

    const update = (collection_id, collectionInput = UpdateCollectionParams) => {
        if (!data) return;

        if (collectionInput.title.trim() === '') {
            alert('Must has name');
            return;
        }

        unsplash.collection
            .update(collection_id, {
                ...collectionInput,
            })
            .then((collection) => {
                const newData = [...data];
                const index = newData.findIndex((item) => item.id === collection_id);

                if (index !== -1) {
                    newData[index] = collection;
                    setData(newData);
                }
            })
            .catch((error) => console.error('Update Collection Error: ', error));
    };

    const remove = (collection_id) => {
        if (!data) return;

        unsplash.collection.delete(collection_id).catch((error) => console.error('Remove Collection Error: ', error));

        const newData = data.filter((item) => item.id !== collection_id);
        setData(newData);
    };

    useEffect(() => {
        if (userInput.username && userInput.username !== data[0]?.user?.username) {
            getCollections();
        }
    }, [userInput.page, userInput.username]);

    return {
        data,
        add,
        create,
        update,
        remove,
        loading,
        error,
    };
}

export default useUserCollection;
