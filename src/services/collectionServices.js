export const getCollections = async (unsplash, token, { page, perPage }) => {
    const responce = await unsplash.collections.list({
        page,
        perPage,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce.response;
};

export const getCollectionPhotos = async (unsplash, token, { collectionId, page, perPage, order_by = 'popular' }) => {
    const responce = await unsplash.collections.getPhotos({
        collectionId,
        page: page,
        perPage: perPage,
        orderBy: order_by,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce.response;
};

export const getCollectionInfo = async (unsplash, token, { collectionId }) => {
    const responce = await unsplash.collections.get({
        collectionId,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce.response;
};
