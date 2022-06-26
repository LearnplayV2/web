import { useForm } from "react-hook-form";
import PrivateTemplate from "../../components/template/private";
import InputGroup from "../../components/UI/inputGroup";
import { ChangeProfilePhoto } from "../../services/users";

export default function Profile() {

    const {register, handleSubmit} = useForm<any>();

    const onSubmit = async (data : any) => {
        try {
            const {image} = data;
            const formData = new FormData();
            formData.append('file', image[0]);
            console.log(image[0])
            
            const response = await ChangeProfilePhoto(formData);

            console.log(response);

        } catch(err) {
            console.log(err);
        }
    }
    
    return(
        <PrivateTemplate>
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