export const ListPhotoParams = {
    page: undefined,
    per_page: undefined,
    order_by: undefined,
};

export const ListRandomPhotosParams = {
    collections: undefined,
    topics: undefined,
    username: undefined,
    query: undefined,
    orientation: undefined,
    content_filter: undefined,
    count: undefined,
};

export const UpdatePhotoParams = {
    id: undefined,
    description: undefined,
    show_on_profile: true,
    tags: [],
    location: {
        latitude: undefined,
        longitude: undefined,
        name: undefined,
        city: undefined,
        country: undefined,
    },
    exif: {
        make: undefined,
        model: undefined,
        exposure_time: undefined,
        aperture_value: undefined,
        focal_length: undefined,
        iso_speed_ratings: undefined,
    },
};
