import { ListSearchCollectionParams, ListSearchPhotoParams, ListSearchUserParams } from '../params/search';
import { API } from '../utils';
//import API from '.';
import validation from './validation';

const SearchServices = {
    getPhotos: async (params = ListSearchPhotoParams) => {
        params.order_by && validation.checkSearchOrderBy(params.order_by);
        params.content_filter && validation.checkContentFilter(params.content_filter);
        params.color && validation.checkColor(params.color);
        params.orientation && validation.checkOrientation(params.orientation);
        params.page && validation.checkNumberValue({ value: params.page, string: 'page' });
        params.per_page && validation.checkNumberValue({ value: params.per_page, string: 'per_page' });
        const response = await API.get(`/search/photos`, { params });
        return response.data;
    },
    getUsers: async (params = ListSearchUserParams) => {
        params.page && validation.checkNumberValue({ value: params.page, string: 'page' });
        params.per_page && validation.checkNumberValue({ value: params.per_page, string: 'per_page' });
        const response = await API.get(`/search/users`, { params });
        return response.data;
    },
    getCollections: async (params = ListSearchCollectionParams) => {
        params.page && validation.checkNumberValue({ value: params.page, string: 'page' });
        params.per_page && validation.checkNumberValue({ value: params.per_page, string: 'per_page' });
        const response = await API.get(`/search/collections`, { params });
        return response.data;
    },
};

export default SearchServices;
