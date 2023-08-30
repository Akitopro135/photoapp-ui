import requestKey from '~/utils/request';
import axios from 'axios';

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
    return responce.response.results;
};

export const getRandomPhoto = async (unsplash, token, search = 'camera') => {
    const responce = await unsplash.photos.getRandom({
        query: search,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce.response;
};

export const getPhoto = async (unsplash, token, { page, perPage, order_by = 'popular' }) => {
    const responce = await unsplash.photos.list({
        page: page,
        perPage: perPage,
        orderBy: order_by,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce.response.results;
};

export const getDetailPhoto = async (unsplash, photoId, token) => {
    const responce = await unsplash.photos.get({
        photoId: photoId,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce.response;
};

// export const getDetailPhoto2 = async (photoId) => {
//     try {
//         const response = await axios.get(`https://api.unsplash.com/photos/?id=${photoId}&client_id=${key}`);
//         return response.data; // Trả về dữ liệu của ảnh, không cần dùng .then()
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// };

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

export const getDownload = async (unsplash, token, { photoId }) => {
    const responce = await unsplash.photos
        .get({
            photoId,
        })
        .then((result) => {
            if (result.type === 'success') {
                const photo = result.response;
                unsplash.photos.trackDownload({
                    downloadLocation: photo.links.download_location,
                });
            }
        });
    return responce.response;
};
