import { Notifications } from "../../../service/notifications";

const NotificationsList = () => {
    const {data, error, isLoading} = Notifications.get();

    if(error) {
        return <div style={{padding: '1rem'}}>Ocorreu um erro inesperado.</div>;
    } else if(isLoading || !data) {
        return <div style={{padding: '1rem'}}>Carregando...</div>;
    } else if(data.length == 0) {
        return <div style={{padding: '1rem'}}>Nenhuma notificação.</div>;
    }
    
    return(
        <>  
            {data.map(notification => (
                <li>
                    {notification.title}
                </li>
            ) )}
        </>
    )
};

export {NotificationsList};