import axios from "axios";
import { setCookie } from "nookies";

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
        setCookie(null, this.TOKEN, token, {path: '/', maxAge: this.COOKIE_DURATION});
    }
}

export {Authentication};