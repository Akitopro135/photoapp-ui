import axios from 'axios';

let listAccessKeys = [
    { accessKey: process.env.REACT_APP_ACCESS_KEY_2, secretKey: process.env.REACT_APP_ACCESS_SECRET_KEY_2 },
    { accessKey: process.env.REACT_APP_ACCESS_KEY_3, secretKey: process.env.REACT_APP_ACCESS_SECRET_KEY_3 },
    { accessKey: process.env.REACT_APP_ACCESS_KEY_4, secretKey: process.env.REACT_APP_ACCESS_SECRET_KEY_4 },
];

const getAccessKey = (index) => {
    const accessKey = listAccessKeys[index].accessKey;
    return accessKey;
};

const API = axios.create({
    baseURL: 'https://api.unsplash.com/',
    timeout: 30000,
    headers: {
        Authorization: `Client-ID ${getAccessKey(localStorage.getItem('accessKey') || 0)}`,
        'X-Ratelimit-Limit': 1000,
        'X-Ratelimit-Remaining': 999,
    },
    transformResponse: (data) => {
        if (data === 'Rate Limit Exceeded') {
            const key = API.defaults.headers.Authorization.split(' ')[1];
            const index = listAccessKeys.findIndex((item) => item.accessKey === key);

            let newIndex = (index + 1) % listAccessKeys.length;
            localStorage.setItem('accessKey', newIndex);
            window.location.reload();

            throw new Error(data);
        }
        try {
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Parse data error: ${error}, data: ${data}`);
        }
    },
});

API.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.log('request error: ', error);
        return Promise.reject(error);
    },
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log('response error: ', error);
        return Promise.reject(error);
    },
);

export default API;
