import { useEffect } from "react";
import { TITLE } from "../utils/config";

export default function usePageTitle(description? : string) {

    useEffect(() => {
        document.title = (description) ? `${TITLE} - ${description}` : TITLE;
    }, []);

}