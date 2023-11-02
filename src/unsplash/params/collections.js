export const ListCollectionParams = {
    page: 1,
    per_page: 10,
};

export const GetCollectionPhotosParams = {
    id: '',
    page: 1,
    per_page: 10,
    orientation: undefined,
};

export const CreateCollectionParams = {
    title: '',
    description: '',
    private: false,
};

export const UpdateCollectionParams = {
    title: '',
    description: '',
    private: false,
};

export const AddPhotoToCollectionParams = {
    collection_id: '',
    photo_id: '',
};

export const RemovePhotoFromCollectionParams = {
    collection_id: '',
    photo_id: '',
};
