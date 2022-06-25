import { TITLE } from "../utils/config";
import onReady from "./loadOnce";

export default function usePageTitle(title : string) {

    onReady(() => {
        document.title = `${TITLE} - ${title}`;
    });

}