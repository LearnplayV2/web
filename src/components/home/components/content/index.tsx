import React, { ChangeEvent, createContext, Dispatch, FormEvent, FormEventHandler, SetStateAction, useContext, useEffect, useState } from 'react';
import { TextInput } from '../../../ui/input';
import { FaUserGraduate } from 'react-icons/fa';
import { MdOutlinePassword, MdOutlineAlternateEmail } from 'react-icons/md';
import { css } from '@emotion/react';
import { UserService } from '../../../../service/user';
import { useDispatch } from 'react-redux';
import { CustomError } from '../../../../utils/error';
import { setModal } from '../../../../store/alert';
import { HandleCookie } from '../../../../utils/cookies';
import { useNavigate } from 'react-router-dom';

interface Form {
    login?: string;
    password?: string;
}

interface LoginContext {
    login?: boolean;
    setLogin?: Dispatch<SetStateAction<boolean>>;
    form?: Form;
    setForm?: Dispatch<SetStateAction<Form>>;
}

const LoginCxt = createContext<LoginContext>({});

const Content = () => {
    const [form, setForm] = useState<Form>({});
    const [login, setLogin] = useState<boolean>(true);

    return (
        <LoginCxt.Provider value={{login, setLogin, form, setForm}}>
            <div className="content">
                <div className="presentation">
                    <div>
                        <img src="/assets/img1.png" />
                    </div>
                    <div className="title">
                        <h1>A plataforma do</h1>
                        <h1> conhecimento.</h1>
                    </div>
                    <p>
                        Somos uma comunidade que compartilha conhecimento. <br />
                        Acesse grupos de estudo, compartilhe artigos e aulas. <br />
                        Não fique de fora!
                    </p>
                </div>
                {login ? <Login /> : <Register />}
            </div>
        </LoginCxt.Provider>
    );
};

const Register = () => {
    const {setLogin} = useContext(LoginCxt);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    class Handle {

        private static async Register(form: FormData) {
            try {
                const data = {
                    email: form.get('email'),
                    name: form.get('name'),
                    password: form.get('password'),
                };
                const response = await UserService.register(data);
                HandleCookie.setAuth(response.data.token);
                navigate('/dashboard');
                
            } catch(e: any) {
                const err = CustomError.message(e?.response?.data?.response?.message ?? e?.message);
                dispatch(setModal({element: err}));
            }
        }

        static Submit(e: FormEvent) {
            e.preventDefault();
            const el = e.target as HTMLFormElement;
            const form = new FormData(el);
    
            try {
                if(!form.get('name') || !form.get('email') || !form.get('password')) throw new Error('Preencha todos os campos.');
                if(form.get('re-password') != form.get('password')) throw new Error('Senhas não conferem.');
                Handle.Register(form);
            } catch(err) {
                if((err as Error)?.message) dispatch(setModal({element: (err as Error)?.message}));
            }
        }

        static Login() {
            setLogin!(true);
        }

    }

    return(
        <div className='login'>
            <h2>Cadastre-se</h2>
            <form onSubmit={Handle.Submit}>
                <TextInput icon={<FaUserGraduate size={18} />} name="name" type="text" placeholder='Como deseja ser chamado?' autoFocus />
                <TextInput icon={<MdOutlineAlternateEmail size={18} />} name="email" type='email' placeholder='email@example.com' />
                <TextInput icon={<MdOutlinePassword size={18} />} name="password" type='password' placeholder='**********' />
                <TextInput icon={<MdOutlinePassword size={18} />} name="re-password" type='password' placeholder='Repita a senha' />
                <div css={alignButtons}>
                    <a onClick={Handle.Login}>Fazer login</a>
                    <button type='submit'>Cadastrar-se</button>
                </div>
            </form>
        </div>
    );
};

const Login = () => {
    const [attemps, setAttemps] = useState(0);
    const {setLogin} = useContext(LoginCxt);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(attemps == 3) {
            setTimeout(() => {
                setAttemps(0);
                dispatch(setModal({element: 'Agora você pode tentar novamente.'}));
            }, 10000);
        }
    }, [attemps]);

    class Handle {
        private static async Login(form: FormData) {
            try {
                if(attemps == 3) throw new Error('Você errou muitas vezes, tente novamente mais tarde.');
                if(!form.get('email') || !form.get('password')) throw new Error('Preencha todos os campos.');
                const response = await UserService.login({email: form.get('email'), password: form.get('password')});
    
                HandleCookie.setAuth(response.data.token);
                navigate('/dashboard');
            } catch(e : any) {
                setAttemps(state => (state < 3) ? state + 1: state );
                const err = CustomError.message(e?.response?.data?.response?.message ?? e.message);
                dispatch(setModal({element: err}));
            }
        };

        static Submit(e: FormEvent) {
            e.preventDefault();
            const el = e.target as HTMLFormElement;
            const form = new FormData(el);
            Handle.Login(form);
        }

        static Register() {
            setLogin!(false);
        }
    }

    return (
        <div className="login">
            <h2>Faça login</h2>
            <form onSubmit={Handle.Submit}>
                <TextInput icon={<FaUserGraduate size={18} />} name="email" type="email" placeholder='email@example.com' autoFocus />
                <TextInput icon={<MdOutlinePassword size={18} />} name="password" type="password" placeholder='*******' />
                <div css={alignButtons}>
                    <a onClick={Handle.Register}>Criar uma conta</a>
                    <button>Entrar</button>
                </div>
            </form>
        </div>
    );
};

const alignButtons = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
        float: right;
        min-width: 110px;
    }
`;

export { Content };
