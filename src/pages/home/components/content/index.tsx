import { FormEvent, useEffect, useState } from 'react';
import { TextInput } from '../../../../components/ui/input';
import { FaUserGraduate } from 'react-icons/fa';
import { MdOutlinePassword } from 'react-icons/md';
import { css } from '@emotion/react';
import { UserService } from '../../../../service/userService';
import { useDispatch } from 'react-redux';
import { CustomError } from '../../../../utils/error';
import { setModal } from '../../../../store/alert';
import { HandleCookie } from '../../../../utils/cookies';
import { useNavigate } from 'react-router-dom';

const Content = () => {
    return (
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
            <Login />
        </div>
    );
};

const Login = () => {
    const [hasAccount, setHasAcc] = useState(false);
    const [attemps, setAttemps] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(attemps == 3) {
            setTimeout(() => {
                setAttemps(0);
                dispatch(setModal('Agora você pode tentar novamente.'));
            }, 10000);
        }
    }, [attemps]);

    const handleLogin = async (form: FormData) => {
        try {
            if(attemps == 3) throw new Error('Você errou muitas vezes, tente novamente mais tarde.');
            if(!form.get('email') || !form.get('password')) throw new Error('Preencha todos os campos.');
            const response = await UserService.login({email: form.get('email'), password: form.get('password')});

            HandleCookie.setAuth(response.data.token);
            navigate('/dashboard');
        } catch(e : any) {
            console.log(e);
            setAttemps(state => (state < 3) ? state + 1: state );
            const err = CustomError.message(e?.response?.data?.response?.message ?? e.message);
            dispatch(setModal(err));
        }
    };
    
    const handleSubmitLogin = (e: FormEvent) => {
        e.preventDefault();
        const el = e.target as HTMLFormElement;
        const form = new FormData(el);

        handleLogin(form);
    }

    return (
        <div className="login">
            <h2>Faça login</h2>
            <form onSubmit={handleSubmitLogin}>
                <TextInput icon={<FaUserGraduate size={18} />} name="email" type="email" placeholder='email@example.com' autoFocus />
                <TextInput icon={<MdOutlinePassword size={18} />} name="password" type="password" placeholder='*******' />
                <button css={css`
                    float: right;
                    min-width: 110px;
                `}>Entrar</button>
            </form>
        </div>
    );
};

export { Content };
