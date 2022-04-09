import axios from 'axios';

export const list = () => {
    return axios.get(
        'https://yspm.api.storeapi.net/api/94/219?format=json&appid=14504&sign=05a9eb86624aead124f9aa5b742f0929'
    );
};

