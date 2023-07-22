import unsplash from '~/utils/request';

export const getSearch = async (search, page = 1, perPage = 10) => {
    const responce = await unsplash.search.getPhotos({
        query: search,
        page: page,
        perPage: perPage,
    });
    return responce.response.results;
};
