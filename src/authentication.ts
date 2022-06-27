import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { Refresh } from "./services/users";
import { UserType } from "./Types/user";

const TOKEN = 'LEARNPLAY_TOKEN';
const COOKIE_DURATION = 30 * 24 * 60 * 60;

export function useCheck(fn: GetServerSideProps) {
    return async(ctx: GetServerSidePropsContext) => {
        const cookies = parseCookies(ctx);
        
        if(cookies[TOKEN])
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
        
        return fn(ctx);
        
    }
}

export function usePrivateRoute(fn: GetServerSideProps) {
    return async (ctx : GetServerSidePropsContext) => {

        const cookies = parseCookies(ctx);
        
        try {
            if(!cookies[TOKEN]) throw new Error();

            const revalidate = await Refresh(cookies[TOKEN]); // your API Fetch
            const newToken = revalidate.data.token;

            setCookie(null, TOKEN, newToken, { path: '/', maxAge: COOKIE_DURATION });

            const userData : UserType = revalidate.data;
            // receive props from file then merge with props from here
            const propsReceived = await fn(ctx).then(c => { return c; });

            const props = {
                ...propsReceived,
                props: {
                    user: userData,
                    //@ts-ignore
                    ...propsReceived.props
                }
            }
            return props;

        } catch(err) {
            destroyCookie(ctx, TOKEN);
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

    }
}

export {TOKEN, COOKIE_DURATION};