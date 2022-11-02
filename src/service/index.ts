import axios from 'axios';

const service = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
});

export {service};