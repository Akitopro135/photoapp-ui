import unsplash from '~/utils/request';

export const getSearch = async (search = '', page = 1, perPage = 10, order_by = 'latest') => {
    const responce = await unsplash.search.getPhotos({
        query: search,
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

export const getPhoto = async (page = 1, perPage = 10, order_by = 'popular') => {
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
