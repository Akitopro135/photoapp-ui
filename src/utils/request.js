import axios from 'axios';
import { createApi } from 'unsplash-js';

function requestKey() {
    const list = [
        process.env.REACT_APP_ACCESS_KEY,
        process.env.REACT_APP_ACCESS_KEY_2,
        process.env.REACT_APP_ACCESS_KEY_3,
        process.env.REACT_APP_ACCESS_KEY_4,
    ];

    let i = Math.floor(Math.random() * list.length);

    const unsplash = createApi({
        accessKey: list[i],
    });

    const key = list[i];
    console.log(key);

    return {
        unsplash,
        key,
        token: null,
    };
}

// async function requestKey() {
//     const getStoredToken = localStorage.getItem('unsplashToken');

//     const urlParams = new URLSearchParams(window.location.search);

//     if (getStoredToken) {
//         // Nếu đã có token trong localStorage, sử dụng lại token đó
//         console.log('Có token');
//         const unsplash = createApi({
//             headers: {
//                 Authorization: `Bearer ${getStoredToken}`,
//             },
//         });

//         return {
//             unsplash,
//             key: null,
//             token: getStoredToken,
//         };
//     } else if (urlParams.size === 1) {
//         console.log('Có code');
//         // Nếu có code trong URL, lấy token từ code và lưu vào localStorage
//         const token = await getToken(urlParams.get('code'));

//         const unsplash = createApi({
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         return {
//             unsplash,
//             key: null,
//             token,
//         };
//     } else {
//         // Không có token và không có code, sử dụng unsplash với accessKey từ list[i]
//         console.log('éo đăng nhập');
//         const list = [
//             process.env.REACT_APP_ACCESS_KEY,
//             process.env.REACT_APP_ACCESS_KEY_2,
//             process.env.REACT_APP_ACCESS_KEY_3,
//             process.env.REACT_APP_ACCESS_KEY_4,
//         ];

//         let i = Math.floor(Math.random() * list.length);

//         const unsplash = createApi({
//             accessKey: list[i],
//         });

//         return {
//             unsplash,
//             key: list[i],
//             token: null,
//         };
//     }
// }

// const getToken = async (code) => {
//     const baseUrl = 'https://unsplash.com/oauth/token';
//     const clientId = `client_id=${process.env.REACT_APP_ACCESS_KEY}`;
//     const clientSecret = `client_secret=${process.env.REACT_APP_ACCESS_SECRET_KEY}`;
//     const redirect = `redirect_uri=http://localhost:3000/`;
//     const grantType = 'grant_type=authorization_code';

//     const axiosInstance = axios.create();

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
//     }
// };

export default requestKey;
