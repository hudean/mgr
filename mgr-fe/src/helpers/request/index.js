import axios from 'axios';

const domain = 'http://localhost:3000';

// axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;

const getHeaders = () => {
    return{
        Authorization: `Bearer ${getToken()}`,
    }
};

export const post = (url,data = {}) => {
    return axios.post(url,data,{
        headers:getHeaders(),
    });
};

export const del = (url) => {
    return axios.delete(url,{
        headers:getHeaders(),
    });
};

export const get  = (url,data = {}) => {
    return axios.get(url,{
        params:data,
        headers:getHeaders(),
    })
};