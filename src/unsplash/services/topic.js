import { ListTopicParams, ListTopicPhotoParams } from '../params/topic';
import { API } from '../utils';
//import API from '.';
import validation from './validation';

const TopicService = {
    list: async (params = ListTopicParams) => {
        validation.checkTopicOrderBy(params.order_by);
        const response = await API.get(`/topics`, { params });
        return response.data;
    },
    get: async (id_or_slug) => {
        const response = await API.get(`/topics/${id_or_slug}`);
        return response.data;
    },
    getPhotos: async (input = ListTopicPhotoParams) => {
        const { id_or_slug, ...params } = input;
        validation.checkOrderBy(params.order_by);
        params.orientation && validation.checkOrientation(params.orientation);
        const response = await API.get(`/topics/${id_or_slug}/photos`, { params });
        return response.data;
    },
};

export default TopicService;
