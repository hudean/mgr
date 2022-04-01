import axios from 'axios';
import { getToken } from '@/helpers/token';

axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;

export const add = (form) => {
    return axios.post(
        'http://localhost:3000/doctor/add', 
        form,
    );
};

export const list = (data) => {
    return axios.get(
        'http://localhost:3000/doctor/list', 
        {
            params:data,
        }
    );
};

export const remove = (id) => {
    return axios.delete(
        `http://localhost:3000/doctor/${id}`,
    );
};

export const update = (data = {} ) => {
    return axios.post(
        `http://localhost:3000/doctor/update`,
        data,
    );
};

export const addMany = (key) => {
    return axios.post(
        'http://localhost:3000/doctor/addMany',{
            key,
    });
};