import axios from 'axios';

export const add = (form) => {
    return axios.post(
        'http://localhost:3000/consult/add', 
        form,
    );
};

export const list = (data) => {
    return axios.get(
        'http://localhost:3000/consult/list', 
        {
            params:data
        }
    );
};

export const remove = (id) => {
    return axios.delete(
        `http://localhost:3000/consult/${id}`,
    );
};

export const update = (data = {} ) => {
    return axios.post(
        `http://localhost:3000/consult/update`,
        data,
    );
};

export const addMany = (key) => {
    return axios.post(
        'http://localhost:3000/consult/addMany',{
            key,
    });
};