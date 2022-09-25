import moment from "moment";
import { GetServerSideProps, NextPage } from "next";
import { TOKEN, usePrivateRoute } from "../../../authentication";
import PrivateTemplate from "../../../components/template/private";
import { Container } from "../../../components/UI";
import { UserType } from "../../../Types/user";
import UserService from '../../../services/users';
import { parseCookies } from "nookies";
import { wrapper } from "../../../store/store";
import { useEffect } from "react";
import NotificationsSocket from "../../../services/socket/notifications";
import { NotificationDescription, NotitificationTypeEnum } from "../../../Types/notification";
import { defaultUserImage } from "../../../utils/defaultImage";

export default function Page(props: any) {

    const profile = props.profile as UserType;
    const user = props.user as UserType;

    useEffect(() => {
        NotificationsSocket.sendNotification({
            uuid: profile.uuid!, 
            message: `${user.name} visitou seu perfil`, 
            description: JSON.stringify({
                type: NotitificationTypeEnum.user_profile_visit,
                data: [user.name, user.uuid],
                body: 'visitou seu perfil'
            } as NotificationDescription) 
        });
    }, [])

    return (profile) ? (
        <PrivateTemplate>
            <Container marginTop="15vh" marginBottom="50px" widthPercent={50}>
                <div className="flex flex-col items-center">
                    <div className="avatar w-24 relative bg-gray-800 rounded-full">
                        <div className="w-24 rounded-full ring ring-green-600 ring-offset-base-100 ring-offset-2">
                            <img src={profile.user_items?.photo ?? defaultUserImage()} title='Mudar foto' className="transition-opacity duration-150 z-10 relative" />
                        </div>
                    </div>
                    <div className="mt-5 mb-5">
                        <span className='text-2xl'>{profile.name}</span>
                    </div>
                    <div className="px-8 py-2 bg-zinc-700 rounded-md text-white">
                        Ativo desde {moment(profile.createdAt).format('D/MM/YYYY, H:mm')}
                    </div>
                </div>
            </Container>
        </PrivateTemplate>
    ) : (
        <PrivateTemplate>
            <Container marginTop="15vh" marginBottom="50px" widthPercent={50}>
                <div className="text-center">
                    Perfil não encontrado.
                </div>
            </Container>
        </PrivateTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => usePrivateRoute(async (ctx) : Promise<any> => {

    
    const cookies = parseCookies(ctx);
    const { uuid } = ctx.query as { uuid: string };

    // redirect to your profile
    if(store.getState().user.uuid === uuid) {
        return {
            redirect: {
                destination: '/dashboard/profile',
            }
        }
    }

    try {

        const response = await UserService.GetProfileInfo(uuid, cookies[TOKEN]);

        return {
            props: {
                profile: response.data
            }
        }

    } catch (err) {
        console.log(err)
    }

    return {
        props: {
        }
    }
}));