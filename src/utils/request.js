import { createApi } from 'unsplash-js';

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

export default unsplash;
