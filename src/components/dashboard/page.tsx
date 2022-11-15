import { PropsWithChildren } from "react";
import { Header } from "./header/index";
import { RightMenu } from "./lateralMenu";

interface Props extends PropsWithChildren {
    hasLeftMenu?: boolean;
}

const Dashboard = (props: Props) => {
    const {children, hasLeftMenu} = props;
    
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