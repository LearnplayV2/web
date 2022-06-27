import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { usePrivateRoute } from "../../authentication";
import PrivateTemplate from "../../components/template/private";
import InputGroup from "../../components/UI/inputGroup";
import { ChangeProfilePhoto } from "../../services/users";
import { changePhoto } from "../../store/user/userReducer";
import { UserType } from "../../Types/user";

export default function Profile(props: any) {

    const {register, handleSubmit} = useForm<any>();
    const user = props.user as UserType;
    
    const router = useRouter();
    const dispatch = useDispatch();

    const onSubmit = async (data : any) => {
        try {
            const {image} = data;
            const response = await ChangeProfilePhoto(image);
            dispatch(changePhoto(`${user.uuid!}?_=${new Date().getTime()}`));

        } catch(err) {
            console.log(err);
        }
    }
    
    return(
        <PrivateTemplate userUuid={user.uuid!}>
            <h5>Change profile photo</h5>
            <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                <InputGroup icon={'file'}>
                    <input {...register('image')} type="file" />
                </InputGroup>
                <button type="submit" className="btn btn-default">Salvar</button>
            </form>
        </PrivateTemplate>
    );
}

export const getServerSideProps : GetServerSideProps = usePrivateRoute(async (ctx) => {
    return {
        props: {}
    }
});