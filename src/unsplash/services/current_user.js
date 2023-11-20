import { UpdateUserProfieParams } from '../params/current_user';
import { TOKEN } from '../utils';
//import API from '.';

const CurrentUserService = {
    get: async () => {
        const response = await TOKEN.get(`/me`);
        //const response = await API.get(`/me`);

        return response.data;
    },
    update: async (params = UpdateUserProfieParams) => {
        const response = await TOKEN.put('/me', undefined, { params });
        //const response = await API.put('/me', undefined, { params });

        return response.data;
    },
};

export default CurrentUserService;
