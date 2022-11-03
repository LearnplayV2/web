import { service } from ".";
import { HandleCookie } from "../utils/cookies";

class UserService {
    static path = (path: string) => `/user/${path}`;

    static login(data: any) {
        return service.post(this.path('login'), data);
    }

    static isAuthenticated() {
        const token = HandleCookie.cookies.get(HandleCookie.cookieName.token);
        return token != undefined;
    }
    
}

export {UserService};