import { parseCookies } from 'nookies';
import { Authentication } from '../src/service/authentication';
import App from './app';
import { Container } from './components/container';
import Header from './components/header';

const Home = () => {

    const cookies = parseCookies();

    console.log(cookies)

    Authentication.check();
       
    return (
        <App>
            <Header />
            <Container />
        </App>
    );
};

export default Home;
