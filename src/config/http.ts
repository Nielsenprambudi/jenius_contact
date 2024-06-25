import {default as axios} from 'axios';


const http = axios.create({
    baseURL: 'https://contact.herokuapp.com/'
});

export default http;