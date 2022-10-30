import { useRouter } from "next/navigation";
import { FormEvent, useContext } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import { AccCtxProps, AccountContext } from ".";
import { Authentication } from "../../service/authentication";
import { Alert } from "../../utils/alets";
import { Input } from "../ui/input";

const Login = () => {
    const router = useRouter();
    const {toggleHasAcc} = useContext(AccountContext) as AccCtxProps;

    const login = async(props: {email: string, password: string}) => {
        const {email, password} = props;
        try {
            const response = await Authentication.login(email, password);
            Authentication.saveToken(response.data.token);
            router.refresh();
            
        } catch(err : any) {
            console.log(err);
            Alert.error({message: err?.response?.data?.response?.message});
        }
    };
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        login({email: formData.get('email') as string, password: formData.get('password') as string});
    }

    return (
        <div className="login">
            <h2>Faça login</h2>
            <form onSubmit={handleSubmit}>
                <Input name='email' type="email" id="email" icon={<MdEmail />} placeholder="email@example.com" required/>
                <Input name='password' type="password" id="password" icon={<MdPassword />} placeholder="************" required/>
                <button type="submit">Entrar</button>
            </form>
            <br />
            Não tem uma conta? <span className='link' onClick={toggleHasAcc}>Cadastre-se</span>
        </div>
    );
};

export default Login;