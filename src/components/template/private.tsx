import React from "react";
import Navbar from "../navbar";

export default function PrivateTemplate({children, userUuid} : {children: React.ReactNode, userUuid: string}) {

    return(
        <>  
            <Navbar userUuid={userUuid} isPrivate />
            {children}
        </>
    );
}