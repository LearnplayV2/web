import { cookies } from 'next/headers';
import { redirect as go } from 'next/navigation';
import { Authentication } from '../service/authentication';

const Session = () => {
    
    const isAuthenticated = cookies().get(Authentication.TOKEN) != undefined;
    const token = isAuthenticated ? cookies().get(Authentication.TOKEN) : null;

    const redirect = (success: string) => {
        if(isAuthenticated) {
            return go(success);
        }
    };

    const restrict = () => {
        if(!isAuthenticated) {
            return go('/');
        }
    };

    return {
        isAuthenticated,
        redirect,
        restrict,
        token
    }
};

export {Session};