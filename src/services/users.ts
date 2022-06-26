import { parseCookies } from "nookies";
import { TOKEN } from "../authentication";
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

export function ChangeProfilePhoto(data: FormData) {
    const cookies = parseCookies();
    
    return api.post('/user/set-profile-picture', data, {
        headers: {
            Authorization: `Bearer ${cookies[TOKEN]}`,
            'content-type': 'multipart/form-data'
        }
    });
}