import Template from '../components/template/index';
import styled from 'styled-components';
import { COLORS } from '../utils/config';
import { Col } from '../components/UI';
import usePageTitle from '../hooks/usePageTitle';
import { useForm } from 'react-hook-form';
import { VALIDATION } from '../utils/validation';
import React from 'react';
import { UserType } from '../Types/user';
import { Register } from '../services/users';
import { toast } from 'react-toastify';
import InputGroup from '../components/UI/inputGroup';
import { setCookie } from 'nookies';
import { COOKIE_DURATION, TOKEN, useCheck } from '../authentication';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

export default function Page() {

    usePageTitle('Cadastro');

    const { register, handleSubmit, formState: { errors } } = useForm<UserType>();
    const router = useRouter();

    const onSubmit = async (data: UserType) => {
        const { name, email, password, confirm_password } = data;
        try {
            if (password !== confirm_password) throw Error('Senhas não conferem');
            delete data.confirm_password;

            const response = await Register(data);

            if(response.status == 201) {
                
                setCookie(null, TOKEN, response.data.token, { path: '/', maxAge: COOKIE_DURATION });
                router.reload();

                return toast.success('Usuário cadastrado com sucesso!', { toastId: 'server-success' });
            }

            throw new Error('Ocorreu um erro');

        } catch(err : any) {
           if(err.response) return toast.error(err.response.data.response.message, {toastId: 'server-error'});
            return toast.error(err.message, {toastId: 'error'});
        }
    }

    return (
        <Template>
            <Form>
                <div className="flex flex-row items-baseline">
                    <div>
                        <h3 className='text-3xl font-medium'>Cadastro</h3>
                    </div>
                    <div className='ml-5 text-sm'>
                        Faça parte da plataforma criando uma conta
                    </div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Col>
                            <InputGroup icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f9f9f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>

                            } error={errors.email}>
                                <input type="text" { ...register('email', { required: { value: true, message: VALIDATION.FIELDS_NULL }, pattern: { value: VALIDATION.EMAIL, message: 'Preencha um e-mail válido' } } ) } placeholder="example@email.com" className="input focus:outline-none bg-zinc-800 w-full" autoFocus />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f9f9f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            } error={errors.name}>
                                <input type="text" {...register('name', {required: {value: true, message: VALIDATION.FIELDS_NULL} }) } placeholder="Como deseja ser chamado?" className="input focus:outline-none bg-zinc-800 w-full" />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f9f9f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>

                            } error={errors.password}>
                                <input type="password" {...register('password', {required: {value: true, message: VALIDATION.FIELDS_NULL}} )} placeholder="*****" className="input focus:outline-none bg-zinc-800 w-full" />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f9f9f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            } error={errors.confirm_password}>
                                <input type="password" {...register('confirm_password', {required: {value: true, message: VALIDATION.FIELDS_NULL}})} placeholder="Confirme sua senha" className="input focus:outline-none bg-zinc-800 w-full" />
                            </InputGroup>
                        </Col>
                        <br />
                        <Col>
                            <button type='submit' className="no-animation btn bg-green-600 hover:bg-green-500 transition-colors text-black btn-block">Cadastrar</button>
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
    flex-direction: column;
    margin: 0 auto;
    width: 600px;
    padding:64px;
    margin-top: 15vh;
    background-color: ${COLORS.secondary};
    
    @media (max-width: 768px) {
        width: 80%;
    }

`;