import { UserType } from "../Types/user";
import { api } from "./instance";

export function Register(data: UserType) {
    console.log(process.env.API_URL)
    return api.post('/user/register', data);
}