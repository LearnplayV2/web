import { Main } from "../main";
import { Dashboard } from "../page";

const DashboardPage = () => {

    return(
        <Dashboard hasLeftMenu={true}>
            <Main />
        </Dashboard>
    );
};

export {DashboardPage};