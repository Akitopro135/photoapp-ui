import { ListSearchCollectionParams, ListSearchPhotoParams, ListSearchUserParams } from '../params/search';
import { API } from '../utils';
import validation from './validation';

const SearchServices = {
    getPhotos: async (params = ListSearchPhotoParams) => {
        validation.checkSearchOrderBy(params.order_by);
        validation.checkContentFilter(params.content_filter);
        validation.checkColor(params.color);
        params.orientation && validation.checkOrientation(params.orientation);
        const response = await API.get(`/search/photos`, { params });
        return response.data;
    },
    getUsers: async (params = ListSearchUserParams) => {
        const response = await API.get(`/search/users`, { params });
        return response.data;
    },
    getCollections: async (params = ListSearchCollectionParams) => {
        const response = await API.get(`/search/collections`, { params });
        return response.data;
    },
};

export default SearchServices;
