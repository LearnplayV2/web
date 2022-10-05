import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import UserService from './services/users';
import { store } from "./store/store";
import { setImage, setUserEmail, setUserUuid } from "./store/reducers/user";
import { UserItems, UserType } from "./Types/user";
import { setNotification } from "./store/reducers/notification";

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

            const revalidate = await UserService.Refresh(cookies[TOKEN]); // your API Fetch
            const newToken = revalidate.data.token;

            setCookie(null, TOKEN, newToken, { path: '/', maxAge: COOKIE_DURATION });

            const userData : UserType = revalidate.data;

            const userItems = await UserService.getUserItems(cookies[TOKEN]);
            const items : UserItems = userItems.data;

            // receive props from file then merge with props from here
            const propsReceived = await fn(ctx).then(c => { return c; });
            
            store.dispatch(setUserUuid(userData.uuid!));
            store.dispatch(setUserEmail(userData.email!));
            if(items.photo) store.dispatch(setImage(items.photo));

            // get notifications
            const notifications = await UserService.GetNotifications(cookies[TOKEN]);
            store.dispatch(setNotification(notifications.data))

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
            console.log('error:', err);
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