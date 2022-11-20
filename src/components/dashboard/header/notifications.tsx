import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Notifications as NotificationsService } from "../../../service/notifications";
import { Notifications as NotificationSocket } from "../../../service/socket/notifications";
import { INotification, INotificationDetails, notificationActions } from "../../../store/notifications";
import { RootState } from "../../../store/storeConfig";

const NotificationsList = () => {
    const {notifications} = useSelector((state: RootState) => state.notifications) as INotification;
    const {data, error, isLoading} = NotificationsService.get();
    const dispatch = useDispatch();
    
    useEffect(() => {
        NotificationSocket.recover((data: INotificationDetails[]) => {
            dispatch(notificationActions.set(data));
        });
    }, []);
    
    useEffect(() => {
        // on mount notification
        if(data) {
            dispatch(notificationActions.set(data as INotificationDetails[]));
        }
    }, [data]);
    
    if(error) {
        return <div style={{padding: '1rem'}}>Ocorreu um erro inesperado.</div>;
    } else if(isLoading || !data) {
        return <div style={{padding: '1rem'}}>Carregando...</div>;
    }
    
    return(
            <>  
            {(notifications.length > 0) 
                ? notifications.map((notification, i) => (
                    <li key={i}>
                    {notification.title}
                    </li>
                )) 
                : <div style={{padding: '1rem'}}>Nenhuma notificação</div>}
            </>
        );
}
            
export {NotificationsList};