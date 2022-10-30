import App from "../../components/app";
import Header from "../../components/header";
import { Session } from "../../components/session";

const Page = () => {

    Session().restrict();

    return(
        <App>
            <Header />
            Dashboard
        </App>
    );
}

export default Page;