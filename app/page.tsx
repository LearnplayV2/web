import App from './app';
import { Container } from './components/container';
import Header from './components/header';
import { Session } from './session';

const Home = () => {

    Session().redirect({success: '/dashboard'});

    return (
        <App>
            <Header />
            <Container />
        </App>
    );
};

export default Home;
