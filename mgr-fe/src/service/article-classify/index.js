import axios from 'axios';

export const add = (title) => {
    return axios.post('http://localhost:3000/article-classify/add',{
        title,
    });
};

export const list = () => {
    return axios.get('http://localhost:3000/article-classify/list');
};

export const remove = (id) => {
    return axios.delete(`http://localhost:3000/article-classify/${id}`);
};

export const updateTitle = (id,title) => {
    return axios.post('http://localhost:3000/article-classify/update/title',{
        id,
        title,
    });
};

