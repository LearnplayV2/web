import { cookies } from 'next/headers';
import { redirect as go } from 'next/navigation';
import { Authentication } from '../src/service/authentication';

const Session = () => {
    
    const isAuthenticated = cookies().get(Authentication.TOKEN) != undefined;
    const token = isAuthenticated ? cookies().get(Authentication.TOKEN) : null;

    const redirect = (props: {success?: string, denied?: string}) => {
        const {success, denied} = props;
        if(isAuthenticated) {
            if(success) return go(success);
        } else {
            if(denied) return go(denied);
        }
    };

    return {
        isAuthenticated,
        redirect,
        token
    }
};

export {Session};