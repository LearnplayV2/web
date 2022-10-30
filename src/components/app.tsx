import './header/header.module.scss';

function App(props: React.PropsWithChildren) {
    const {children} = props;

    return(
        <>
            {children}
        </>
    );

}

export default App;