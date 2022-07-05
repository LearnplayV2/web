import { GetServerSideProps } from "next/types";
import { TOKEN, usePrivateRoute } from "../../../authentication";
import PrivateTemplate from "../../../components/template/private";
import { Container } from "../../../components/UI";
import { wrapper } from "../../../store/store";
import UserService from '../../../services/users';
import { parseCookies } from "nookies";
import Parse from "../../../utils/stringCleaner";

export default function Page(props : any) {

    const {notification} = props as {
        notification : {
            title: string;
            description: string;
        }
    };
    
    return(
        <PrivateTemplate>
            <Container widthPercent={50} marginTop='15vh' marginBottom="50px">
                <h3 className="text-3xl">{notification.title}</h3> <br />
                {Parse(notification.description)}
            </Container>
        </PrivateTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(({ dispatch }) => usePrivateRoute(async (ctx) => {

    try {
        const {id} = ctx.query as {id: string};
        
        const cookies = parseCookies(ctx);

        const response = await UserService.GetNotification(cookies[TOKEN], id!);

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

    return {
        props: {}
    }
}));