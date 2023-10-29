import { ListPhotoParams, ListRandomPhotosParams, UpdatePhotoParams } from '../params/photos';
import { API, TOKEN } from '../utils';
import validation from './validation';

const PhotoService = {
    get: async (id) => {
        const response = await API.get(`/photos/${id}`);
        return response.data;
    },
    list: async (params = ListPhotoParams) => {
        const response = await API.get(`/photos`, { params });
        return response.data;
    },
    statistics: async (id) => {
        const response = await API.get(`/photos/${id}/statistics`);
        return response.data;
    },
    track: async (id) => {
        const response = await API.get(`/photos/${id}/download`);
        return response.data;
    },
    random: async (params = ListRandomPhotosParams) => {
        validation.checkOrientation(params.orientation);
        validation.checkContentFilter(params.content_filter);
        validation.checkCount(params.count);
        const response = await API.get('/photos/random', { params });
        return response.data;
    },
    update: async (input = UpdatePhotoParams) => {
        const { id, ...params } = input;
        const response = await TOKEN.put(`/photos/${id}`, { params });
        return response.data;
    },
    like: async (id) => {
        const response = await TOKEN.post(`/photos/${id}/like`);
        return response.data;
    },
    unLike: async (id) => {
        const response = await TOKEN.delete(`/photos/${id}/like`);
        return response.data;
    },
};

// async function listPhoto({ page = 1, per_page = 10, order_by = 'latest' }) {
//     const response = await API.get(`/photos?page=${page}&per_page=${per_page}&order_by=${order_by}`);
//     return response.data;
// }

// async function getRandomPhoto({
//     collections,
//     topics,
//     username,
//     query,
//     orientation = 'landscape',
//     content_filter = 'low',
//     count = 1,
// }) {
//     if (content_filter !== 'low' && content_filter !== 'high') {
//         throw new Error('content_filter must be "low" or "high"');
//     } else if (orientation !== 'landscape' && orientation !== 'portrait' && orientation !== 'squarish') {
//         throw new Error('orientation must be "landscape" or "portrait" or "squarish"');
//     } else if (count > 30 || count < 0) {
//         throw new Error('count > 1; max: 30');
//     }
//     const response = await API.get(
//         `/photos/random?query=${query}||username=${username}||topics=${topics}||collections=${collections}&orientation=${orientation}&content_filter=${content_filter}&count=${count}`,
//     );
//     return response.data;
// }

export default PhotoService;
