import { parseCookies } from "nookies";
import { parse } from "path";
import { TOKEN } from "../authentication";
import { UserType } from "../Types/user";
import { api } from "./instance";

class Service {

    public Register(data: UserType) {
        return api.post('/user/register', data);
    }

    public Login(data: UserType) {
        return api.post('/user/login', data);
    }

    public Refresh(token: string) {
        return api.get('/user/refresh', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public ChangeProfilePhoto(data: any) {
        const cookies = parseCookies();
        const formData = new FormData();
        formData.append('file', data[0]);
    
        return api.post('/user/set-profile-picture', formData, {
            headers: {
                Authorization: `Bearer ${cookies[TOKEN]}`,
                'content-type': 'multipart/form-data'
            }
        });
    }

    public GetProfileInfo(uuid: string, token : string) {
        const cookies = parseCookies();
        return api.get(`/user/profile/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    
}

export default new Service;