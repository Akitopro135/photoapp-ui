import { ListPhotoParams, ListRandomPhotosParams, UpdatePhotoParams } from '../params/photos';
import { API, TOKEN } from '../utils';
//import API from '.';
import validation from './validation';

const PhotoService = {
    get: async (id) => {
        const response = await TOKEN.get(`/photos/${id}`);
        return response.data;
    },
    list: async (params = ListPhotoParams) => {
        params.page && validation.checkNumberValue({ value: params.page, string: 'page' });
        params.per_page && validation.checkNumberValue({ value: params.per_page, string: 'per_page' });
        params.order_by && validation.checkOrderBy(params.order_by);
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
        params.orientation && validation.checkOrientation(params.orientation);
        params.content_filter && validation.checkContentFilter(params.content_filter);
        validation.checkCount(params.count);
        const response = await API.get('/photos/random', { params });
        return response.data;
    },
    update: async (input = UpdatePhotoParams) => {
        const { id, ...params } = input;
        params.location.latitude &&
            validation.checkNumberValue({ value: params.location.latitude, string: 'latitude' });
        params.location.longitude &&
            validation.checkNumberValue({ value: params.location.longitude, string: 'longtitude' });
        const response = await TOKEN.put(`/photos/${id}`, { params });
        //const response = await API.put(`/photos/${id}`, { params });

        return response.data;
    },
    like: async (id) => {
        const response = await TOKEN.post(`/photos/${id}/like`);
        //const response = await API.post(`/photos/${id}/like`);

        return response.data;
    },
    unLike: async (id) => {
        const response = await TOKEN.delete(`/photos/${id}/like`);
        //const response = await API.delete(`/photos/${id}/like`);

        return response.data;
    },
};

export default PhotoService;
