import Template from '../components/template/index';
import styled from 'styled-components';
import { COLORS } from '../utils/config';
import { Col, Row } from '../components/UI';
import InputGroup from '../components/UI/inputGroup';
import Link from 'next/link';

export default function Page() {
    return (
        <Template>
            <Form>
                <div className="presentation text-justify">
                    <h4 className='text-3xl font-medium'>A plataforma do conhecimento</h4>
                    <br />
                    <p>
                        Somos uma comunidade grande de estudantes que desejam compartilhar conhecimento e aprimorar a vida de outros no meio remoto, além de ser uma plataforma open-source para contribuir com o crescimento.
                        <br /><br />
                        Acesse/crie grupos de estudo, compartilhe artigos e aulas.
                        <br /><br />
                        <Link href='/register'><a className='btn btn-primary'>Comece agora</a></Link>
                    </p>
                </div>
                <div className='login-form'>
                    <h3 className='text-3xl font-medium'>Fazer login</h3>
                    <form action="">
                        <Col>
                            <InputGroup icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f9f9f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            }>
                                <input type="email" placeholder="example@email.com" className="input input-bordered focus:outline-none w-full" autoFocus />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f9f9f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            }>
                                <input type="password" placeholder="*****" className="input input-bordered focus:outline-none w-full" />
                            </InputGroup>
                        </Col>
                        <Col>
                            <Row className='justify-between my-6'>
                                <div><Link href='#'><a className='link text-indigo-500 hover:text-indigo-700 no-underline transition-color duration-150'>Esqueci minha senha</a></Link></div>
                                {/* <div>Continuar conectado</div> */}
                            </Row>
                        </Col>
                        <Col>
                            <button type='submit' className="btn bg-indigo-700 hover:bg-indigo-600 transition-colors text-white btn-block">Entrar</button>
                        </Col>
                        <Col>
                            Não tem uma conta? <Link href='/register'><a className='link text-indigo-500 hover:text-indigo-700 no-underline transition-color duration-150'>Cadastre-se</a></Link>
                        </Col>
                    </form>
                </div>
            </Form>
        </Template>
    );
}

const Form = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    width: 80%;
    align-items: baseline;
    justify-content: space-evenly;
    border-radius:5px;
    margin-top: 15vh;

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