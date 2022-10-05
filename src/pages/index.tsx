import Template from '../components/template/index';
import styled from 'styled-components';
import { COLORS } from '../utils/config';
import { Col, Row } from '../components/UI';
import InputGroup from '../components/UI/inputGroup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { UserType } from '../Types/user';
import { VALIDATION } from '../utils/validation';
import { toast } from 'react-toastify';
import usePageTitle from '../hooks/usePageTitle';
import { GetServerSideProps } from 'next';
import { COOKIE_DURATION, TOKEN, useCheck } from '../authentication';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';
import UserService from '../services/users';
import { useState } from 'react';
import { LoadingPulse } from '../components/UI/loading';

export default function Page() {

    const [loginLoad, setLoginLoad] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<UserType>();
    const router = useRouter();

    usePageTitle();

    const onSubmit = async (data: UserType) => {
        setLoginLoad(true);
        try {
            const response = await UserService.Login(data);

            if(response.status == 200) {
                setCookie(null, TOKEN, response.data.token, { path: '/', maxAge: COOKIE_DURATION });
                router.reload();
            }
        } catch (err) {
            console.log(err);
            setLoginLoad(false);
            if (err.response) return toast.error(err.response.data.response.message, { toastId: 'server-error' });
        }

    }

    return (
        <Template>
            <Form>
                <div className="presentation">
                    <div className="text-center">
                        <span className='text-3xl font-medium'>A plataforma do </span>
                        <span className='text-3xl font-medium text-green-500'>conhecimento</span>
                    </div>
                    <div className='mb-5'></div>
                    <img src='/assets/img1.png' width={200} className='mx-auto my-10' />
                    <p className='text-lg text-center'>
                        Somos uma comunidade que compartilha conhecimento.
                        <br />
                        Acesse grupos de estudo, compartilhe artigos e aulas.
                        <br />
                        Não fique de fora
                        <br /><br />
                    </p>
                    <div className="text-center">
                        {/* <Link href='/register'><a className='btn px-10 font-bold bg-emerald-600 text-black hover:bg-emerald-700 hover:text-black'>Comece agora</a></Link> */}
                    </div>
                </div>
                <div className='login-form'>
                    <h3 className='text-3xl font-medium mb-8'>Fazer login</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Col>
                            <InputGroup error={errors.email} icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f9f9f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            }>
                                <input {...register('email', { required: true, pattern: VALIDATION.EMAIL })} type="email" placeholder="example@email.com" className="input bg-zinc-800 focus:outline-none w-full" autoFocus />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup error={errors.password} icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f9f9f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            }>
                                <input {...register('password', { required: true })} type="password" placeholder="*****" className="input bg-zinc-800 focus:outline-none w-full" />
                            </InputGroup>
                        </Col>
                        <Col>
                            <Row className='justify-between my-4'>
                                <div><Link href='#'><a>Esqueci minha senha</a></Link></div>
                            </Row>
                        </Col>
                        <Col>
                            <button type='submit' className="no-animation my-3 btn bg-green-600 hover:bg-green-500 transition-colors text-black btn-block">
                                {loginLoad 
                                    ? <LoadingPulse size={25} />
                                    : 'ENTRAR'
                                }
                            </button>
                        </Col>
                        <Col>
                            Não tem uma conta? <Link href='/register'><a>Cadastre-se</a></Link>
                        </Col>
                    </form>
                </div>
            </Form>
        </Template>
    );
}

export const getServerSideProps : GetServerSideProps = useCheck(async (ctx) => {
    return {
        props: {}
    }
});

const Form = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    width: 80%;
    align-items: baseline;
    justify-content: space-evenly;
    border-radius:5px;
    margin-top: 15vh;
    margin-bottom: 15vh;

    .presentation {
        width: 40%;
    }

    .login-form {
        padding: 64px;
        background: ${COLORS.secondary};
        width: 30%;
    }
    
    @media (max-width: 1400px) {
        flex-direction: column;
        align-items: center;

        .presentation {
            margin-bottom: 50px;
        }

        .presentation, .login-form {
            width:100%;
        }
    }

`;