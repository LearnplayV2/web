import { GetServerSidePropsContext } from "next";
import { destroyCookie } from "nookies";
import { TOKEN } from "../../authentication";

export default function Logout() {

    return(<>Aguarde...</>);
    
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {

    destroyCookie(ctx, TOKEN, { path: '/' });

    return {
        redirect: {
            destination: '/',
        }
    };

}