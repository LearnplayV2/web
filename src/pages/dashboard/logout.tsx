import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { TOKEN } from "../../authentication";
import onReady from "../../hooks/loadOnce";

export default function Logout() {

    const route = useRouter();

    onReady(() => ClearLoginAndRedirect() );

    function ClearLoginAndRedirect() {
        destroyCookie(null, TOKEN, { path: '/' });

        route.push('/');
    }

    return(<>Aguarde...</>);
    
}