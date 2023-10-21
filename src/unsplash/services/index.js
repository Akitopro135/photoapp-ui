import axios from 'axios';

const listAccessKeys = [
    process.env.REACT_APP_ACCESS_KEY,
    process.env.REACT_APP_ACCESS_KEY_2,
    process.env.REACT_APP_ACCESS_KEY_3,
    process.env.REACT_APP_ACCESS_KEY_4,
];

let currentAccessKeyIndex = 0;
localStorage.setItem('accessKey', listAccessKeys[0]);

function getAccessKey() {
    const accessKey = listAccessKeys[currentAccessKeyIndex];
    return accessKey;
}

const API = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
        Authorization: `Client-ID ${localStorage.getItem('accessKey')}`,
        'X-Ratelimit-Limit': 1000,
        'X-Ratelimit-Remaining': 999,
    },
    transformResponse: (data) => {
        if (data === 'Rate Limit Exceeded') {
            currentAccessKeyIndex = (currentAccessKeyIndex + 1) % listAccessKeys.length;
            localStorage.setItem('accessKey', listAccessKeys[currentAccessKeyIndex]);
            API.defaults.headers.common['Authorization'] = `Client-ID ${localStorage.getItem('accessKey')}`;
            console.log(localStorage.getItem('accessKey'));
            throw new Error(data);
        }
        try {
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Parse data error: ${error}, data: ${data}`);
        }
    },
});

// API.interceptors.request.use(
//     (config) => config,
//     (error) => {
//         console.log('request error: ', error);
//         return Promise.reject(error);
//     },
// );

// API.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         console.log('response error: ', error);
//         return Promise.reject(error);
//     },
// );

export default API;
