import axios from "axios";

class UserService {
    
    static service = `${process.env.API_HOST}/user`;
    
    static items(token: string) {
        return axios.get(`${this.service}/user-items`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    
}

export {UserService};