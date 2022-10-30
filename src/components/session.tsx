import { cookies } from 'next/headers';
import { redirect as go } from 'next/navigation';
import { Authentication } from '../service/authentication';

function Session() {
    
    const isAuthenticated = cookies().get(Authentication.TOKEN) != undefined;
    const token = isAuthenticated ? cookies().get(Authentication.TOKEN) : null;

    const restrict = {
        authenticated: (success?: string) => {
            if(isAuthenticated) return go(success ?? '/dashboard');
        },
        guest: (denied?: string) => {
            if(!isAuthenticated) return go(denied ?? '/');
        }
    };

    return {
        isAuthenticated,
        restrict,
        token
    }
};

export {Session};