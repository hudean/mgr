import axios  from 'axios'

import base from './base';

const api = {
    getChinaData(){
        return axios.get('api/94/219?format=json&appid=14504&sign=05a9eb86624aead124f9aa5b742f0929');
    }
}

export default api