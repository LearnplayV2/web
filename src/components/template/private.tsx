import React from "react";
import { useDispatch, useSelector } from "react-redux";
import onReady from "../../hooks/loadOnce";
import { wrapper } from "../../store/store";
import { changePhoto, UserState } from "../../store/user/userReducer";
import Navbar from "../navbar";

export default function PrivateTemplate({children, userUuid} : {children: React.ReactNode, userUuid: string}) {

    const dispatch = useDispatch();

    // set user profile photo
    const { photo } = useSelector((state: any) => state.user) as UserState;
    onReady(() => { if(photo != userUuid) dispatch(changePhoto(userUuid)) });

    return(
        <>  
            <Navbar isPrivate />
            {children}
        </>
    );
}