import unsplash from '~/utils/request';

export const getSearch = async ({ query = 'top', page = 1, perPage = 10, order_by = 'latest' }) => {
    const responce = await unsplash.search.getPhotos({
        query,
        page: page,
        perPage: perPage,
        orderBy: order_by,
    });
    return responce.response.results;
};

export const getRandomPhoto = async (search = 'camera') => {
    const responce = await unsplash.photos.getRandom({
        query: search,
    });
    return responce.response;
};

export const getPhoto = async ({ page, perPage, order_by = 'popular' }) => {
    const responce = await unsplash.photos.list({
        page: page,
        perPage: perPage,
        orderBy: order_by,
    });
    return responce.response.results;
};

export const getDetailPhoto = async (photoId) => {
    const responce = await unsplash.photos.get({
        photoId: photoId,
    });
    return responce.response;
};

export const getCollections = async ({ page, perPage }) => {
    const responce = await unsplash.collections.list({
        page,
        perPage,
    });
    return responce.response;
};

export const getCollectionPhotos = async ({ collectionId, page, perPage, order_by = 'popular' }) => {
    const responce = await unsplash.collections.getPhotos({
        collectionId,
        page: page,
        perPage: perPage,
        orderBy: order_by,
    });
    return responce.response;
};

export const getCollectionInfo = async ({ collectionId, page, perPage, order_by = 'popular' }) => {
    const responce = await unsplash.collections.get({
        collectionId,
    });
    return responce.response;
};
