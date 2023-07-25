import { createApi } from 'unsplash-js';

console.log(process.env);
const list = [process.env.REACT_APP_ACCESS_KEY, process.env.REACT_APP_ACCESS_KEY_2];
let i = 0;

const checkAccessKey = () => {
    try {
        return list[i];
    } catch (error) {
        i += 1;
        return list[i];
    }
};

const unsplash = createApi({
    accessKey: checkAccessKey(),
});

export default unsplash;
