import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserService } from "../service/userService";

interface Props extends React.PropsWithChildren {
    isPrivate?: boolean;
}

const AuthProvider = (props : Props) => {
    const {isAuthenticated} = UserService;
    let {isPrivate, children} = props;
    const location = useLocation();
    const navigate = useNavigate();

    const [mounted, setMounted] = useState(false);

    isPrivate = isPrivate ?? location.pathname.endsWith('/dashboard');

    
    useEffect(() => {
        console.log(isPrivate)
        if(isPrivate) {
            if(isAuthenticated()) navigate('/dashboard');
            navigate('/');
        } else {
            if(!isAuthenticated()) navigate('/');
            if(!location.pathname.includes('/dashboard')) navigate('/dashboard');
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

export {AuthProvider};