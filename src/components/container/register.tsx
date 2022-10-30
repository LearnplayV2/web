import { useRouter } from "next/navigation";
import { FormEvent, useContext } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import { RiUserHeartLine } from "react-icons/ri";
import { AccCtxProps, AccountContext } from ".";
import { Authentication } from "../../service/authentication";
import { Alert } from "../../utils/alert";
import { Input } from "../ui/input";

function Register() {
    const {toggleHasAcc} = useContext(AccountContext) as AccCtxProps;
    const router = useRouter();

    const register = async (props : {name: string, email: string, password: string}) => {
        const {email, name, password} = props;
        try {
            const response = await Authentication.register(email, name, password);
            Authentication.saveToken(response.data.token);
            router.refresh();
            
        } catch(err: any) {
            Alert.error({message: err?.response?.data?.response?.message});
        }
    };
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const el = e.target as HTMLFormElement;
        const form = new FormData(el); 

        try {
            if(form.get('password') !== form.get('re-password')) 
                throw new Error('Senhas não conferem, por favor repita a senha.');
            register({email: form.get('email') as string, password: form.get('password') as string, name: form.get('name') as string});

        } catch(err: any) {
            console.log(err);
            Alert.error({message: err?.message});
        }
    };
    
    return(
        <div className="login">
            <h2>Cadastre-se</h2>
            <form onSubmit={handleSubmit}>
                <Input name="name" type='text' id="name" icon={<RiUserHeartLine />} placeholder="Como deseja ser chamado?" required/>
                <Input name='email' type='email' id="email" icon={<MdEmail />} placeholder="email@example.com" required/>
                <Input name='password' type='password' id="password" icon={<MdPassword />} placeholder="************" required/>
                <Input name='re-password' type='password' id="re-password" icon={<MdPassword />} placeholder="Repita a senha novamente" required/>
                <button type="submit">Cadastrar</button>
            </form>
            <br />
            Já possui conta? <span className="link" onClick={toggleHasAcc}>Faça login</span>
        </div>
    );
};

export default Register;