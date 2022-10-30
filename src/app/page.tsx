import App from '../components/app';
import { Container } from '../components/container';
import Header from '../components/header';
import { Session } from '../components/session';

const Home = () => {

    Session().redirect('/dashboard');

    return (
        <App>
            <Header />
            <Container />
        </App>
    );
};

export default Home;
