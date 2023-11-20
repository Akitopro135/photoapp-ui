// import axios from 'axios';

// let listAccessKeys = [
//     { accessKey: process.env.REACT_APP_ACCESS_KEY, secretKey: process.env.REACT_APP_ACCESS_SECRET_KEY },
//     { accessKey: process.env.REACT_APP_ACCESS_KEY_2, secretKey: process.env.REACT_APP_ACCESS_SECRET_KEY_2 },
//     { accessKey: process.env.REACT_APP_ACCESS_KEY_3, secretKey: process.env.REACT_APP_ACCESS_SECRET_KEY_3 },
//     { accessKey: process.env.REACT_APP_ACCESS_KEY_4, secretKey: process.env.REACT_APP_ACCESS_SECRET_KEY_4 },
// ];

// const getAccessKey = (index) => {
//     const accessKey = listAccessKeys[index].accessKey;
//     return accessKey;
// };

// const getSecretKey = (index) => {
//     const secretKey = listAccessKeys[index].secretKey;
//     return secretKey;
// };

// export const loginWithUnsplash = () => {
//     const baseUrl = 'https://unsplash.com/oauth/authorize';
//     const clientId = `client_id=${getAccessKey(localStorage.getItem('accessKey') || 0)}`;
//     const redirect = `redirect_uri=http://localhost:3000/user/me/photos/`;
//     const responseType = `response_type=code`;
//     const allScope = [
//         'public',
//         'read_user',
//         'write_user',
//         'read_photos',
//         'write_photos',
//         'write_likes',
//         'write_followers',
//         'read_collections',
//         'write_collections',
//     ];

//     const scope = `scope=${allScope.join('+')}`;

//     //const url = `${baseUrl}?${clientId}&${redirect}&${responseType}&${scope}`;
//     const url = `${baseUrl}?${clientId}&${redirect}&${responseType}`;

//     return url;
// };

// const requestKey = () => {
//     const getStoredToken = localStorage.getItem('unsplashToken');

//     const urlParams = new URLSearchParams(window.location.search);

//     if (getStoredToken) {
//         // Nếu đã có token trong localStorage, sử dụng lại token đó
//         console.log('Có token');
//         return `Bearer ${getStoredToken}`;
//     } else if (urlParams.size === 1) {
//         console.log('Có code');
//         // Nếu có code trong URL, lấy token từ code và lưu vào localStorage
//         const token = getToken(urlParams.get('code'));
//         return `Bearer ${token}`;
//     } else {
//         return `Client-ID ${getAccessKey(localStorage.getItem('accessKey') || 0)}`;
//     }
// };

// const getToken = async (code) => {
//     const baseUrl = 'https://unsplash.com/oauth/token';
//     const clientId = `client_id=${getAccessKey(localStorage.getItem('accessKey') || 0)}`;
//     const clientSecret = `client_secret=${getSecretKey(localStorage.getItem('accessKey') || 0)}`;
//     const redirect = `redirect_uri=http://localhost:3000/user/me/photos/`;
//     const grantType = 'grant_type=authorization_code';

//     //const axiosInstance = axios.create();

//     const url = `${baseUrl}?${clientId}&${clientSecret}&${redirect}&code=${code}&${grantType}`;
//     try {
//         const response = await axios.post(url);
//         const token = response.data.access_token;

//         // Lưu token trong localStorage
//         localStorage.setItem('unsplashToken', token);

//         return token;
//     } catch (error) {
//         console.error('Error:', error);
//         return null;
//     } finally {
//         console.log(localStorage.getItem('unsplashToken'));
//         const getInfo = await axios.create({
//             baseURL: 'https://api.unsplash.com/',
//             timeout: 30000,
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('unsplashToken')}`,
//                 'X-Ratelimit-Limit': 1000,
//                 'X-Ratelimit-Remaining': 999,
//             },
//         });

//         const response = await getInfo.get(`/me`);

//         localStorage.setItem('currentId', response.data.username);
//         window.location.reload();
//     }
// };

// const API = axios.create({
//     baseURL: 'https://api.unsplash.com/',
//     timeout: 30000,
//     headers: {
//         Authorization: await requestKey(),
//         'X-Ratelimit-Limit': 1000,
//         'X-Ratelimit-Remaining': 999,
//     },
//     transformResponse: (data) => {
//         if (data === 'Rate Limit Exceeded') {
//             const key = API.defaults.headers.Authorization.split(' ')[1];
//             const index = listAccessKeys.findIndex((item) => item.accessKey === key);

//             let newIndex = (index + 1) % listAccessKeys.length;
//             localStorage.setItem('accessKey', newIndex);

//             if (localStorage.getItem('currentId')) {
//                 const url = loginWithUnsplash();
//                 window.location = url;
//             }

//             //window.location.reload();

//             throw new Error(data);
//         }
//         try {
//             return JSON.parse(data);
//         } catch (error) {
//             throw new Error(`Parse data error: ${error}, data: ${data}`);
//         }
//     },
// });

// API.interceptors.request.use(
//     (config) => {
//         return config;
//     },
//     (error) => {
//         console.log('request error: ', error);
//         return Promise.reject(error);
//     },
// );

// API.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         console.log('response error: ', error);
//         return Promise.reject(error);
//     },
// );

// export default API;
