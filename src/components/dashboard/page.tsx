import { PropsWithChildren, useEffect } from "react";
import { Session } from "../../authentication";
import { WebSocket } from "../../service/socket";
import { Header } from "./header/index";
import { RightMenu } from "./lateralMenu";

interface Props extends PropsWithChildren {
    hasLeftMenu?: boolean;
}

const Dashboard = (props: Props) => {
    const {children, hasLeftMenu} = props;
    
    useEffect(() => {
        WebSocket.addNewUser(Session.user().uuid);
    }, []);
    
    return(
        <>
            {hasLeftMenu && (<RightMenu />)}
            <Header />
            <div style={{height: '75px'}}></div>
            <div>
                {children}
            </div>
        </>
    );
}

export {Dashboard};