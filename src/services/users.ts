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
        return api.get(`/user/profile/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public GetMembers(token : string) {
        const cookies = parseCookies();
        return api.get('/user/members', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public GetNotifications(token: string) {
        return api.get('/user/notifications', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public GetNotification(token: string, id: string) {
        return api.get(`/user/notification/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public ToggleNotification(id: number) {
        const cookies = parseCookies();

        return api.put(`/user/notification/toggle/${id}`, null, {
            headers: {
                Authorization: `Bearer ${cookies[TOKEN]}`
            }
        });
    }
    
}

export default new Service;