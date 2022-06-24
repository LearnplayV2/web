import { useEffect } from "react";

export default function onReady(fn: Function, variable?: any) {

    useEffect(() => {
        fn();
    }, [variable])
    
}