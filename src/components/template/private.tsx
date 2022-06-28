import React from "react";
import Navbar from "../navbar";

export default function PrivateTemplate({children} : {children: React.ReactNode}) {

    return(
        <>  
            <Navbar isPrivate />
            {children}
        </>
    );
}