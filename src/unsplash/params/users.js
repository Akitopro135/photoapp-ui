export const ListUserPhotoParams = {
    username: '',
    page: 1,
    per_page: 10,
    order_by: 'latest',
    stats: false,
    resolution: 'days',
    quantity: 30,
    orientation: undefined,
};

export const ListUserLikePhotoParams = {
    username: '',
    page: 1,
    per_page: 10,
    order_by: 'latest',
    orientation: undefined,
};

export const ListUserCollectionParams = {
    username: '',
    page: 1,
    per_page: 10,
};

export const StatisticsParams = {
    username: '',
    resolution: 'days',
    quantity: 30,
};
