import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingPage } from "../components/ui/loading";
import { User } from "../types/User";
import { HandleCookie } from "../utils/cookies";
import jwt_decode from 'jwt-decode';

interface Props extends React.PropsWithChildren {
    isPrivate?: boolean;
    access?: string;
    denied?: string;
}

const Session = (props : Props) => {
    let {isPrivate, access, denied, children} = props;
    const location = useLocation();
    const navigate = useNavigate();

    const [mounted, setMounted] = useState(false);

    isPrivate = isPrivate ?? location.pathname.endsWith('/dashboard');

    useEffect(() => {
        if(isPrivate) {
            if(isAuthenticated()) {
                navigate(access ?? '/dashboard');
            } else {
                navigate(denied ?? '/');
            }
        } else {
            if(!isAuthenticated()) {
                navigate(denied ?? '/');
            } else {
                if(!location.pathname.includes(access ?? '/dashboard')) navigate(access ?? '/dashboard');
            }
        }
        setMounted(true);
    }, []);
    
    if(mounted) {
        return(
            <>
                {children}
            </>
        );
    }
    
    return(<LoadingPage />);

}

const Logout = () => {
    if(isAuthenticated()) {
        HandleCookie.removeAuth();
        window.location.href = '/';
    }
};

const isAuthenticated = () => {
    const token = HandleCookie.cookies.get(HandleCookie.cookieName.token);
    return token != undefined;
}

const user = () => {
    const user : User = jwt_decode(HandleCookie.cookies.get(HandleCookie.cookieName.token));
    return user;
};

const token = () => {
    return HandleCookie.cookies.get(HandleCookie.cookieName.token);  
};

Session.Provider = Session;
Session.isAuthenticated = isAuthenticated;
Session.user = user;
Session.token = token;
Session.Logout = Logout;

export {Session};