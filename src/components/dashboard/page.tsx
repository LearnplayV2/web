import { useNavigate } from "react-router-dom";
import { Session } from "../../authentication";
import { Dashboard } from "./components/dashboard";

const DashboardMain = () => {
    const navigate = useNavigate();
    
    return(
        <Dashboard>
            <button onClick={() => Session.Logout(() => navigate('/'))}>Sair</button>
        </Dashboard>
    );
}

export {DashboardMain};