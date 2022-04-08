import axios from 'axios';
// import { getToken } from '@/helpers/token';

// axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;

export const add = (id,WhetherAttention) => {
    return axios.post(
        'http://localhost:3000/attention/add', 
        id,
        WhetherAttention
    );
};

export const list = (data) => {
    return axios.get(
        'http://localhost:3000/attention/list', 
        {
            params:data,
        }
    );
};

export const remove = (id) => {
    return axios.delete(
        `http://localhost:3000/attention/${id}`,
    );
};

