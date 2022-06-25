import Template from '../components/template/index';
import styled from 'styled-components';
import { COLORS } from '../utils/config';
import { Col } from '../components/UI';

export default function Page() {
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
                    <form action="">
                        <Col>
                            <label className="input-group">
                                <span>Email</span>
                                <input type="email" placeholder="example@email.com" className="input input-bordered w-full" />
                            </label>
                        </Col>
                        <Col>
                            <label className="input-group">
                                <span>Nome</span>
                                <input type="text" placeholder="Como deseja ser chamado?" className="input input-bordered w-full" />
                            </label>
                        </Col>
                        <Col>
                            <label className="input-group">
                                <span>Senha</span>
                                <input type="password" placeholder="*****" className="input input-bordered w-full" />
                            </label>
                        </Col>
                        <Col>
                            <label className="input-group">
                                <span>Senha</span>
                                <input type="password" placeholder="Confirme sua senha" className="input input-bordered w-full" />
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