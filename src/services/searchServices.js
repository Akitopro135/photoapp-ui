export const getSearch = async (unsplash, token, { query = 'top', page = 1, perPage = 10, order_by = 'latest' }) => {
    const responce = await unsplash.search.getPhotos({
        query,
        page: page,
        perPage: perPage,
        orderBy: order_by,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce.response;
};

export const getSearchUser = async (unsplash, token, { query, page, perPage }) => {
    const responce = await unsplash.search.getUsers({
        query,
        page,
        perPage,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return responce.response;
};

export const getSearchCollection = async (unsplash, token, { query, page, perPage }) => {
    const responce = await unsplash.search.getCollections({
        query,
        page,
        perPage,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return responce.response;
};
