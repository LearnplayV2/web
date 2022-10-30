import App from "./app";
import Header from "./header";
import { Session } from "./session";

function Dashboard(props: React.PropsWithChildren) {
    const {children} = props;
    
    Session().restrict.guest();

    return(
        <App>
            <Header />
            {children}
        </App>
    );
}

export default Dashboard;