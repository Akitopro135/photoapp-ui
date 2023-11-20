import {
    AddPhotoToCollectionParams,
    CreateCollectionParams,
    GetCollectionPhotosParams,
    ListCollectionParams,
    RemovePhotoFromCollectionParams,
    UpdateCollectionParams,
} from '../params/collections';
import { API, TOKEN } from '../utils';
//import API from '.';
import validation from './validation';

const CollectionService = {
    list: async (params = ListCollectionParams) => {
        params.page && validation.checkNumberValue({ value: params.page, string: 'page' });
        params.per_page && validation.checkNumberValue({ value: params.per_page, string: 'per_page' });
        const response = await API.get(`/collections`, { params });
        return response.data;
    },
    get: async (id) => {
        const response = await TOKEN.get(`/collections/${id}`);
        return response.data;
    },
    getPhotos: async (input = GetCollectionPhotosParams) => {
        const { id, ...params } = input;
        params.page && validation.checkNumberValue({ value: params.page, string: 'page' });
        params.per_page && validation.checkNumberValue({ value: params.per_page, string: 'per_page' });
        params.orientation && validation.checkOrientation(params.orientation);
        const response = await TOKEN.get(`/collections/${id}/photos`, { params });
        return response.data;
    },
    getRelatedCollections: async (id) => {
        const response = await API.get(`/collections/${id}/related`);
        return response.data;
    },
    create: async (params = CreateCollectionParams) => {
        params.private && validation.checkBooleanValue(params.private);
        const response = await TOKEN.post(`/collections`, undefined, { params });
        //const response = await API.post(`/collections`, undefined, { params });
        return response.data;
    },
    update: async (id, params = UpdateCollectionParams) => {
        params.private && validation.checkBooleanValue(params.private);
        const response = await TOKEN.put(`/collections/${id}`, undefined, { params });
        //const response = await API.put(`/collections/${id}`, undefined, { params });
        return response.data;
    },
    delete: async (id) => {
        const response = await TOKEN.delete(`/collections/${id}`);
        //const response = await API.delete(`/collections/${id}`);
        return response.data;
    },
    add: async (input = AddPhotoToCollectionParams) => {
        const { collection_id, ...params } = input;
        const response = await TOKEN.post(`/collections/${collection_id}/add`, undefined, { params });
        //const response = await API.post(`/collections/${collection_id}/add`, undefined, { params });
        return response.data;
    },
    remove: async (input = RemovePhotoFromCollectionParams) => {
        const { collection_id, ...params } = input;
        const response = await TOKEN.delete(`/collections/${collection_id}/remove`, { params });
        //const response = await API.delete(`/collections/${collection_id}/remove`, { params });
        return response.data;
    },
};

export default CollectionService;
