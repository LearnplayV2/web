import { GetServerSideProps } from "next/types";
import { TOKEN, usePrivateRoute } from "../../../authentication";
import PrivateTemplate from "../../../components/template/private";
import { Container } from "../../../components/UI";
import { wrapper } from "../../../store/store";
import UserService from '../../../services/users';
import { parseCookies } from "nookies";
import { NotificationProps } from "../../../store/reducers/notification";
import { NotificationDescription, NotitificationTypeEnum } from "../../../Types/notification";
import Link from "next/link";
import nl2br from "../../../utils/nl2br";

export default function Page(props : any) {
    const {notification} = props as { notification : NotificationProps };
    
    return(
        <PrivateTemplate>
            <Container widthPercent={50} marginTop='15vh' marginBottom="50px">
                <h3 className="text-3xl text-green-400">Notificação:</h3> <br />
                <NotificationWrapper notification={notification} />
            </Container>
        </PrivateTemplate>
    );
}

function NotificationWrapper({notification}: {notification: NotificationProps}) {
    
    switch(NotificationDescription(notification).type) {
        case NotitificationTypeEnum.user_profile_visit:
            return <>
                {/* @ts-ignore */}
                <Link href={`/dashboard/profile/${NotificationDescription(notification)!.data[1]}`}>
                {/* @ts-ignore */}
                    <a className="text-blue-400">{NotificationDescription(notification).data[0]}</a>
                </Link>
                <span> {nl2br(NotificationDescription(notification).body!)} </span>
            </>;
        case NotitificationTypeEnum.content:
            return <>{nl2br(NotificationDescription(notification).body!)}</>;
    }

    return( <>Não foi possível obter os dados da notificação.</> );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(({ dispatch }) => usePrivateRoute(async (ctx) : Promise<any> => {

    try {
        const {id} = ctx.query as {id: string};
        
        const cookies = parseCookies(ctx);

        const response = await UserService.GetNotification(cookies[TOKEN], id!) as {data: NotificationProps};

        return {
            props : {
                notification: response.data
            }
        }

    } catch(err: any) {
        return {
            redirect: {
                destination: '/dashboard',
            }
        }
    }
}));