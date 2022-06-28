import { GetServerSideProps } from "next";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { usePrivateRoute } from "../../../authentication";
import PrivateTemplate from "../../../components/template/private";
import { Container } from "../../../components/UI";
import { UserImage } from "../../../components/userImage";
import { changeUuid, UserState } from "../../../store/user/userReducer";
import { UserType } from "../../../Types/user";
import moment from 'moment';
import Link from "next/link";
import {MdCameraAlt, MdLogout} from 'react-icons/md';
import UserService from '../../../services/users';
import { wrapper } from "../../../store/store";

export default function Page(props: any) {
    
    const user = props.user as UserType;
    const { uuid } = useSelector((state: any) => state.user) as UserState;

    const dispatch = useDispatch();

    function onSubmitPhoto() {
        const imgInput = document.querySelector('input[name=image]')! as HTMLInputElement;
        imgInput.click();
        //@ts-ignore
        imgInput.onchange = async (ev: ChangeEvent<HTMLInputElement>) => {
            try {
                const { files } = ev.target;
                const response = await UserService.ChangeProfilePhoto(files);
                dispatch(changeUuid(`${user.uuid!}?_=${new Date().getTime()}`));
                toast.success(response.data.message ?? 'A foto de perfil foi alterada', { toastId: 'photo_changed', position: 'bottom-right' });

            } catch (err) {
                toast.error('Não foi possível alterar a foto de perfil', { toastId: 'photo_error', position: 'bottom-right' });
                console.log(err);
            }
        }
    }

    return (
        <PrivateTemplate>
            <Container marginTop="15vh" marginBottom='50px' widthPercent={50}>
                <h3 className="text-3xl">Meu perfil</h3>
                <div className="flex flex-col items-center">
                    <div className="avatar w-24 relative bg-gray-800 rounded-full">
                        <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <MdCameraAlt size={30} color='#fff' />
                        </div>
                        <div className="w-24 rounded-full ring ring-green-600 ring-offset-base-100 ring-offset-2">
                            <img onClick={onSubmitPhoto} src={UserImage(uuid)} title='Mudar foto' className="cursor-pointer transition-opacity duration-150 hover:opacity-20 z-10 relative" />
                        </div>
                    </div>
                    <div className="mt-5 mb-5">
                        <span className='text-2xl'>{user.name}</span>
                    </div>
                    <div className="px-8 py-2 bg-zinc-700 rounded-md text-white">
                        Ativo desde {moment(user.createdAt).format('D/MM/YYYY, H:mm')}
                    </div>
                    <div className="mt-10">
                        <Link href='./logout'><a className="no-animation btn bg-red-800 hover:bg-red-900 text-white hover:text-white">
                            <MdLogout />&nbsp;&nbsp;Sair
                        </a></Link>
                    </div>
                </div>
                <form style={{ display: 'none' }}>
                    <input name='image' type="file" />
                </form>
            </Container>
        </PrivateTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(({ dispatch }) => usePrivateRoute(async (ctx) => {

    return {
        props: {}
    }
}));