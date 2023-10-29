import {
    AddPhotoToCollectionParams,
    CreateCollectionParams,
    GetCollectionPhotosParams,
    ListCollectionParams,
    RemovePhotoFromCollectionParams,
    UpdateCollectionParams,
} from '../params/collections';
import { API, TOKEN } from '../utils';
import validation from './validation';

const CollectionService = {
    list: async (params = ListCollectionParams) => {
        const response = await API.get(`/collections`, { params });
        return response.data;
    },
    get: async (id) => {
        const response = await API.get(`/collections/${id}`);
        return response.data;
    },
    getPhotos: async (input = GetCollectionPhotosParams) => {
        const { id, ...params } = input;
        params.orientation && validation.checkOrientation(params.orientation);
        const response = await API.get(`/collections/${id}/photos`, { params });
        return response.data;
    },
    getRelatedCollections: async (id) => {
        const response = await API.get(`/collections/${id}/related`);
        return response.data;
    },
    create: async (params = CreateCollectionParams) => {
        const response = await TOKEN.post(`/collections`, undefined, { params });
        return response.data;
    },
    update: async (id, params = UpdateCollectionParams) => {
        const response = await TOKEN.put(`/collections/${id}`, undefined, { params });
        return response.data;
    },
    delete: async (id) => {
        const response = await TOKEN.delete(`/collections/${id}`);
        return response.data;
    },
    add: async (input = AddPhotoToCollectionParams) => {
        const { collection_id, ...params } = input;
        const response = await TOKEN.post(`/collections/${collection_id}/add`, undefined, { params });
        return response.data;
    },
    remove: async (input = RemovePhotoFromCollectionParams) => {
        const { collection_id, ...params } = input;
        const response = await TOKEN.delete(`/collections/${collection_id}/remove`, { params });
        return response.data;
    },
};

export default CollectionService;
