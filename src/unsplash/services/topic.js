import { ListTopicParams, ListTopicPhotoParams } from '../params/topic';
import { API } from '../utils';
//import API from '.';
import validation from './validation';

const TopicService = {
    list: async (params = ListTopicParams) => {
        params.order_by && validation.checkTopicOrderBy(params.order_by);
        params.page && validation.checkNumberValue({ value: params.page, string: 'page' });
        params.per_page && validation.checkNumberValue({ value: params.per_page, string: 'per_page' });
        const response = await API.get(`/topics`, { params });
        return response.data;
    },
    get: async (id_or_slug) => {
        const response = await API.get(`/topics/${id_or_slug}`);
        return response.data;
    },
    getPhotos: async (input = ListTopicPhotoParams) => {
        const { id_or_slug, ...params } = input;
        params.page && validation.checkNumberValue({ value: params.page, string: 'page' });
        params.per_page && validation.checkNumberValue({ value: params.per_page, string: 'per_page' });
        params.order_by && validation.checkOrderBy(params.order_by);
        params.orientation && validation.checkOrientation(params.orientation);
        const response = await API.get(`/topics/${id_or_slug}/photos`, { params });
        return response.data;
    },
};

export default TopicService;
