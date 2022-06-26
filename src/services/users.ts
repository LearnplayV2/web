import { UserType } from "../Types/user";
import { api } from "./instance";

export function Register(data: UserType) {
    return api.post('/user/register', data);
}

export function Login(data: UserType) {
    return api.post('/user/login', data);
}

export function Refresh(token: string) {
    return api.get('/user/refresh', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}