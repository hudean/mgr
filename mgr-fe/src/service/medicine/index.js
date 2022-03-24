import axios from 'axios';

export const add = (form) => {
    return axios.post(
        'http://localhost:3000/medicine/add', 
        form,
    );
};

export const list = (data) => {
    return axios.get(
        'http://localhost:3000/medicine/list', 
        {
            params:data
        }
    );
};

export const remove = (id) => {
    return axios.delete(
        `http://localhost:3000/medicine/${id}`,
    );
};

export const update = (data = {} ) => {
    return axios.post(
        `http://localhost:3000/medicine/update`,
        data,
    );
};

export const addMany = (key) => {
    return axios.post(
        'http://localhost:3000/medicine/addMany',{
            key,
    });
};
export const updateCount = (data = {} ) => {
    return axios.post(
        `http://localhost:3000/medicine/update/count`,
        data,
    );
};