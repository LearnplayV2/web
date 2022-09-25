import { GetServerSideProps } from 'next';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { usePrivateRoute } from '../../../authentication';
import PrivateTemplate from '../../../components/template/private';
import { Container } from '../../../components/UI';
import { setImage, UserState } from '../../../store/reducers/user';
import { UserType } from '../../../Types/user';
import moment from 'moment';
import Link from 'next/link';
import { MdCameraAlt, MdLogout } from 'react-icons/md';
import UserService from '../../../services/users';
import { wrapper } from '../../../store/store';
import NotificationsService from '../../../services/socket/notifications';
import { useFileUpload } from 'js-media-package';

export default function Page(props: any) {
    const { sendFile, base64File } = useFileUpload();

    const user = props.user as UserType;
    const { image } = useSelector((state: any) => state.user) as UserState;

    const dispatch = useDispatch();

    useEffect(() => {
        onSubmitPhoto();
    }, [base64File]);

    async function onSubmitPhoto() {
        try {
            if(base64File) {
                const response = await UserService.ChangeProfilePhoto(base64File);
                dispatch(setImage(base64File));
                NotificationsService.sendNotification({ uuid: user.uuid!, message: 'Você alterou a foto de perfil' });
                toast.success(response.data.message ?? 'A foto de perfil foi alterada', { toastId: 'photo_changed', position: 'bottom-right' });
            }

        } catch (err) {
            toast.error(err.response.data?.response?.message ?? 'Não foi possível alterar a foto de perfil', { toastId: 'photo_error', position: 'bottom-right' });
            console.log(err);
        }
    }

    return (
        <PrivateTemplate>
            <Container marginTop="15vh" marginBottom="50px" widthPercent={50}>
                <h3 className="float-left text-3xl text-green-500">Meu perfil</h3>
                <div className="float-right">
                    <Link href="./logout">
                        <a className="no-animation btn bg-red-800 hover:bg-red-900 text-white hover:text-white">
                            <MdLogout />
                            &nbsp;&nbsp;Sair
                        </a>
                    </Link>
                </div>
                <div style={{ clear: 'both' }} className="mb-10"></div>
                <div className="flex flex-col items-center">
                    <div className="avatar w-24 relative bg-gray-800 rounded-full">
                        <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <MdCameraAlt size={30} color="#fff" />
                        </div>
                        <div className="w-24 rounded-full ring ring-green-600 ring-offset-base-100 ring-offset-2">
                            <label htmlFor="changeProfilePhoto">
                                <img
                                    src={image}
                                    title="Mudar foto"
                                    className="cursor-pointer transition-opacity duration-150 hover:opacity-20 z-10 relative"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="mt-5 mb-5">
                        <span className="text-2xl">{user.name}</span>
                    </div>
                    <div className="px-8 py-2 bg-zinc-700 rounded-md text-white">Ativo desde {moment(user.createdAt).format('D/MM/YYYY, H:mm')}</div>
                </div>
                <form style={{ display: 'none' }}>
                    <input id="changeProfilePhoto" onChange={sendFile} name="image" type="file" />
                </form>
            </Container>
        </PrivateTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(({ dispatch }) =>
    usePrivateRoute(async (ctx) => {
        return {
            props: {},
        };
    }),
);
