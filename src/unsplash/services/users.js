import API from '.';
import {
    ListUserCollectionParams,
    ListUserLikePhotoParams,
    ListUserPhotoParams,
    StatisticsParams,
} from '../params/users';
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
        validation.checkFullOrderBy(params.order_by);
        validation.checkOrientation(params.orientation);
        const response = await API.get(`/users/${username}/photos`, { params });
        return response.data;
    },
    listLikedPhotos: async (input = ListUserLikePhotoParams) => {
        const { username, ...params } = input;
        validation.checkOrderBy(params.order_by);
        validation.checkOrientation(params.orientation);
        const response = await API.get(`/users/${username}/likes`, { params });
        return response.data;
    },
    listCollections: async (input = ListUserCollectionParams) => {
        const { username, ...params } = input;
        const response = await API.get(`/users/${username}/collections`, { params });
        return response.data;
    },
    statistics: async (input = StatisticsParams) => {
        const { username, ...params } = input;
        const response = await API.get(`/users/${username}/statistics`, { params });
        return response.data;
    },
};

export default UserService;
