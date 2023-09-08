export const getUser = async (unsplash, token, { userName }) => {
    const responce = await unsplash.users.get({
        username: userName,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce.response;
};

export const getUserPhotos = async (unsplash, token, { userName, page, perPage, orderBy, stats, orientation }) => {
    const responce = await unsplash.users.getPhotos({
        username: userName,
        page: page,
        perPage: perPage,
        orderBy: orderBy,
        stats: stats,
        orientation: orientation,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce.response;
};

export const getUserCollections = async (unsplash, token, { userName, page, perPage }) => {
    const responce = await unsplash.users.getCollections({
        username: userName,
        page: page,
        perPage: perPage,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce.response;
};

export const getUserLikes = async (unsplash, token, { userName, page, perPage, orderBy, orientation }) => {
    const responce = await unsplash.users.getLikes({
        username: userName,
        page: page,
        perPage: perPage,
        orderBy: orderBy,
        orientation: orientation,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce.response;
};
