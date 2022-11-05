import { service } from ".";
import { Session } from "../authentication";

class UserService {
    static path = (path: string) => '/user/'.concat(path);

    static login(data: any) {
        return service.post(this.path('login'), data);
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
}

export {UserService};