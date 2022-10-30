import axios from "axios";
import { Cookies } from "../utils/cookies";

class Authentication {

    static service = `${process.env.API_HOST}/user`;
    static TOKEN = 'AUTH_LEARNPLAY';
    static COOKIE_DURATION = 30 * 24 * 60 * 60;

    static login(email: string, password: string) {
        return axios.post(`${this.service}/login`, {email, password});
    }

    static register(email: string, name: string, password: string) {
        return axios.post(`${this.service}/register`, {email, name, password});
    }

    static saveToken(token: string) {
        Cookies.setCookie(this.TOKEN, token, 100);
    }

}

export {Authentication};