import { service } from ".";
import { Session } from "../authentication";

class UserService {
    static path = (path?: string) => '/user'.concat(path ? `/${path}` : '');

    static login(data: any) {
        return service.post(this.path('login'), data);
    }

    static register(data: any) {
        return service.post(this.path('register'), data);
    }

    static profilePicture() {
        const token = Session.token();
        return service.get(
            this.path('user-items/'),
            {
                headers: {
                    Authorization: 'Bearer '.concat(token)
                }
            }
        );
    }

    static changeProfilePicture(base64File: string) {
        const token = Session.token();
        return service.post(this.path('set-profile-picture'), {base64File}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }

    static showProfile(userId: string) {
        return import.meta.env.VITE_SERVER.concat(this.path('picture')).concat('?userId=').concat(userId);
    }
}

export {UserService};