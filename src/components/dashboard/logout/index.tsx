"use client"

import { useRouter } from 'next/navigation';
import { Authentication } from '../../../service/authentication';
import { Cookies } from '../../../utils/cookies';

function Logout() {

    const router = useRouter();
    
    const handleLogout = () => {
        Cookies.eraseCookie(Authentication.TOKEN);
        router.push('/');
    };
    
    return <button onClick={handleLogout}>Sair</button>;
};

export {Logout};