import { service } from ".";

class UserService {
    static path = (path: string) => `/user/${path}`;

    static login(data: any) {
        return service.post(this.path('login'), data);
    }
    
}

export {UserService};