import API from '.';
import { UpdateUserProfieParams } from '../params/current_user';

const CurrentUserService = {
    get: async () => {
        const response = await API.get(`/me`);
        return response.data;
    },
    update: async (params = UpdateUserProfieParams) => {
        const response = await API.put('/me', undefined, { params });
        return response.data;
    },
};

export default CurrentUserService;
