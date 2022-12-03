import { Session } from '@/authentication';
import axios from 'axios';

const service = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
});

const headers = {
    Authorization: "Bearer ".concat(Session.token()),
};

export {service, headers};