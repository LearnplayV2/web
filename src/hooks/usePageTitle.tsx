import { TITLE } from "../utils/config";
import onReady from "./loadOnce";

export default function usePageTitle(description? : string) {

    onReady(() => {
        document.title = (description) ? `${TITLE} - ${description}` : TITLE;
    });

}