import {
    ListUserCollectionParams,
    ListUserLikePhotoParams,
    ListUserPhotoParams,
    StatisticsParams,
} from '../params/users';
import { API, TOKEN } from '../utils';
//import API from '.';
import validation from './validation';

const UserService = {
    profile: async (username) => {
        const response = await API.get(`/users/${username}`);
        return response.data;
    },
    portfolio: async (username) => {
        const response = await API.get(`/users/${username}/portfolio`);
        return response.data;
    },
    listPhotos: async (input = ListUserPhotoParams) => {
        const { username, ...params } = input;
        params.order_by && validation.checkFullOrderBy(params.order_by);
        params.orientation && validation.checkOrientation(params.orientation);
        params.page && validation.checkNumberValue({ value: params.page, string: 'page' });
        params.per_page && validation.checkNumberValue({ value: params.per_page, string: 'per_page' });
        params.quantity && validation.checkNumberValue({ value: params.quantity, string: 'quantity' });
        const response = await API.get(`/users/${username}/photos`, { params });
        return response.data;
    },
    listLikedPhotos: async (input = ListUserLikePhotoParams) => {
        const { username, ...params } = input;
        params.order_by && validation.checkOrderBy(params.order_by);
        params.orientation && validation.checkOrientation(params.orientation);
        params.page && validation.checkNumberValue({ value: params.page, string: 'page' });
        params.per_page && validation.checkNumberValue({ value: params.per_page, string: 'per_page' });
        const response = await API.get(`/users/${username}/likes`, { params });
        return response.data;
    },
    listCollections: async (input = ListUserCollectionParams) => {
        const { username, ...params } = input;
        params.page && validation.checkNumberValue({ value: params.page, string: 'page' });
        params.per_page && validation.checkNumberValue({ value: params.per_page, string: 'per_page' });
        const response = await TOKEN.get(`/users/${username}/collections`, { params });
        return response.data;
    },
    statistics: async (input = StatisticsParams) => {
        const { username, ...params } = input;
        params.quantity && validation.checkNumberValue({ value: params.quantity, string: 'quantity' });
        const response = await API.get(`/users/${username}/statistics`, { params });
        return response.data;
    },
};

export default UserService;
