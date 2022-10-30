class Alert {

    static error(props : {message?: string}) {
        const {message} = props;
        alert(message ?? 'Ocorreu um erro inesperado');

    }
    
}

export {Alert};