import { useNavigate } from "react-router-dom";
import { Session } from "../../authentication";

const DashboardPage = () => {
    const navigate = useNavigate();
    
    return(
        <>
            to do here
            <button onClick={() => Session.Logout(() => navigate('/'))}>Sair</button>
        </>
    );
}

export {DashboardPage};