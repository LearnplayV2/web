import React from "react";
import { useDispatch, useSelector } from "react-redux";
import onReady from "../../hooks/loadOnce";
import { changeUuid, UserState } from "../../store/user/userReducer";
import Navbar from "../navbar";

export default function PrivateTemplate({children, userUuid} : {children: React.ReactNode, userUuid: string}) {

    const dispatch = useDispatch();

    // set user profile photo
    const { uuid } = useSelector((state: any) => state.user) as UserState;
    onReady(() => { if(uuid != userUuid) dispatch(changeUuid(userUuid)) });

    return(
        <>  
            <Navbar isPrivate />
            {children}
        </>
    );
}