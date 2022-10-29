'use client';

import styles from './container.module.scss';
import { MdEmail, MdPassword } from 'react-icons/md';
import {RiUserHeartLine} from 'react-icons/ri';
import { Input } from '../ui/input';
import { useContext, useState, createContext, FormEvent } from 'react';
import { Authentication } from '../../../src/service/authentication';
import { Alert } from '../../../src/utils/alets';
import { useRouter } from 'next/navigation';

type AccCtxProps = {
    hasAcc: boolean;
    toggleHasAcc?: () => void;
};

const AccountContext = createContext<AccCtxProps | null>({ hasAcc: false });

const Container = () => {
    const [hasAcc, setHasAcc] = useState(false);

    const toggleHasAcc = () => {
        setTimeout(() => {
            setHasAcc((state) => !state);
        }, 150);
    };

    return (
        <div className={styles.container}>
            <div className="title">
                <h1>
                    A plataforma do <span className="color-green-accent">conhecimento</span>
                </h1>
                <img src="/assets/img1.png" />
                <p>
                    Somos uma comunidade que compartilha conhecimento. <br />
                    Acesse grupos de estudo, compartilhe artigos e aulas. <br />
                    Não fique de fora.
                </p>
            </div>
            <AccountContext.Provider value={{ hasAcc, toggleHasAcc }}>
                {hasAcc ? <Register /> : <Login />}
            </AccountContext.Provider>
        </div>
    );
};

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

const Register = () => {
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

export { Container };
