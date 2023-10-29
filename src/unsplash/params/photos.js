export const ListPhotoParams = {
    page: 1,
    per_page: 10,
    order_by: 'latest',
};

export const ListRandomPhotosParams = {
    collections: '',
    topics: '',
    username: '',
    query: 'camera',
    orientation: 'landscape',
    content_filter: 'low',
    count: 1,
};

export const UpdatePhotoParams = {
    id: '',
    description: '',
    show_on_profile: true,
    tags: [],
    location: {
        latitude: 1,
        longitude: 1,
        name: '',
        city: '',
        country: '',
    },
    exif: {
        make: '',
        model: '',
        exposure_time: '',
        aperture_value: '',
        focal_length: '',
        iso_speed_ratings: '',
    },
};
