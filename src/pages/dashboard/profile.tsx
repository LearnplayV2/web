import { GetServerSideProps } from "next";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { usePrivateRoute } from "../../authentication";
import PrivateTemplate from "../../components/template/private";
import { Container } from "../../components/UI";
import { UserImage } from "../../components/userImage";
import { ChangeProfilePhoto } from "../../services/users";
import { changePhoto, UserState } from "../../store/user/userReducer";
import { UserType } from "../../Types/user";

export default function Profile(props: any) {

    const user = props.user as UserType;
    const { photo } = useSelector((state: any) => state.user) as UserState;

    const dispatch = useDispatch();

    function onSubmitPhoto() {
        const imgInput = document.querySelector('input[name=image]')! as HTMLInputElement;
        imgInput.click();
        //@ts-ignore
        imgInput.onchange = async (ev: ChangeEvent<HTMLInputElement>) => {
            try {
                const { files } = ev.target;
                const response = await ChangeProfilePhoto(files);
                dispatch(changePhoto(`${user.uuid!}?_=${new Date().getTime()}`));
                toast.success(response.data.message ?? 'A foto de perfil foi alterada', { toastId: 'photo_changed', position: 'bottom-right' });

            } catch (err) {
                toast.error('Não foi possível alterar a foto de perfil', { toastId: 'photo_error', position: 'bottom-right' });
                console.log(err);
            }
        }
    }

    return (
        <PrivateTemplate userUuid={user.uuid!}>
            <Container widthPercent={50}>
                <h3 className="text-3xl">Meu perfil</h3>
                <div className="flex flex-col items-center">
                    <div className="avatar w-24 relative bg-green-500 rounded-full">
                        <div className="w-24 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2">
                            <img onClick={onSubmitPhoto} src={UserImage(photo)} title='Mudar foto' className="cursor-pointer transition-opacity duration-150 hover:opacity-50" />
                        </div>
                    </div>
                    <div className="mt-5">
                        <span className='text-xl'>{user.name}</span>
                    </div>
                </div>
                <form style={{ display: 'none' }}>
                    <input name='image' type="file" />
                </form>
            </Container>
        </PrivateTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = usePrivateRoute(async (ctx) => {
    return {
        props: {}
    }
});