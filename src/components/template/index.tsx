import React from "react";
import Navbar from "../navbar";

export default function Guest({children} : {children: React.ReactNode}) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}