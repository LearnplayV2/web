import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HandleCookie } from "../utils/cookies";

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
    
    return(<></>);

}

const Logout = (callback: Function) => {
    if(isAuthenticated()) {
        HandleCookie.cookies.remove(HandleCookie.cookieName.token);
        callback();
    }
};

const isAuthenticated = () => {
    const token = HandleCookie.cookies.get(HandleCookie.cookieName.token);
    return token != undefined;
}

Session.Provider = Session;
Session.isAuthenticated = isAuthenticated;
Session.Logout = Logout;

export {Session};