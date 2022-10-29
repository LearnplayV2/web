import './components/header/header.module.scss';

const App = (props: React.PropsWithChildren) => {
    const {children} = props;

    return(
        <>
            {children}
        </>
    );

}

export default App;