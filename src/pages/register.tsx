import Template from '../components/template/index';
import styled from 'styled-components';
import { COLORS } from '../utils/config';
import { Col } from '../components/UI';
import usePageTitle from '../hooks/usePageTitle';
import { useForm } from 'react-hook-form';
import { VALIDATION } from '../utils/validationRegex';
import React from 'react';

interface DataType {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export default function Page() {

    usePageTitle('Cadastro');

    const { register, handleSubmit, formState: { errors } } = useForm<DataType>();

    const onSubmit = (data: DataType) => {
        const { name, email, password, confirm_password } = data;
        console.log(data);
        console.log(errors.email)
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
                            <label className="input-group">
                                <span>Email</span>
                                <input type="text" {
                                    ...register('email',
                                        {
                                            required: true,
                                            pattern: {
                                                value: VALIDATION.EMAIL,
                                                message: 'Preencha um e-mail válido'
                                            }
                                        }
                                    )
                                } placeholder="example@email.com" className="input input-bordered w-full" />
                            </label>
                        </Col>
                        <Col>
                            <div className="alert alert-warning shadow-lg">
                                <div>
                                    {/* {errors.email && errors.email.message} */}
                                    {errors.email && (
                                        <ErrorAlert>{errors.email.message}</ErrorAlert>
                                    )}
                                </div>
                            </div>

                        </Col>
                        <Col>
                            <label className="input-group">
                                <span>Nome</span>
                                <input type="text" {...register('name')} placeholder="Como deseja ser chamado?" className="input input-bordered w-full" />
                            </label>
                        </Col>
                        <Col>
                            <label className="input-group">
                                <span>Senha</span>
                                <input type="password" {...register('password')} placeholder="*****" className="input input-bordered w-full" />
                            </label>
                        </Col>
                        <Col>
                            <label className="input-group">
                                <span>Senha</span>
                                <input type="password" {...register('confirm_password')} placeholder="Confirme sua senha" className="input input-bordered w-full" />
                            </label>
                        </Col>
                        <Col>
                            <button type='submit' className="btn btn-primary text-white btn-block button-opacity">Cadastrar</button>
                        </Col>
                    </form>
                </div>
            </Form>
        </Template>
    );
}

function ErrorAlert({children} : {children: React.ReactNode}) {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{children}</span>
        </>
    );
}

const Form = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 600px;
    padding:64px;
    border-radius:5px;
    box-shadow: 1px 4px 5px #000;
    margin-top: 15vh;
    background-color: ${COLORS.secondary};
    
    @media (max-width: 768px) {
        width: 80%;
    }

`;