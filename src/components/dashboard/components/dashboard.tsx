import { Header } from "./header";

interface Props extends React.PropsWithChildren {
    
}

const Dashboard = (props: Props) => {
    const {children} = props;

    return(
        <>
            <Header />
            {children}
        </>
    );
};

export {Dashboard};