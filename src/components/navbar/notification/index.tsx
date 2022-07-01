import { useEffect, useState } from "react";
import { MdNotificationsNone } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Websocket, { socket } from '../../../services/socket';
import { addNotification, NotificationProps, NotificationState } from "../../../store/reducers/notification";
import { UserState } from "../../../store/reducers/user";

export default function Notifications() {

    const dispatch = useDispatch();
    
    const {uuid} = useSelector((state : any) => state.user) as UserState;  
    const notifications = useSelector((state: any) => state.notificationsReducer.notifications) as NotificationProps[];

    useEffect(() => { 
        Websocket.addNewUser(uuid!);
        socket.on('getNotification', (data) => {
            dispatch(addNotification(data));
        });
    }, [])

    const noReadNotifications = notifications.filter(notification => !notification.read);;
    
    const Notification = ({children} : {children: React.ReactNode}) => <li><span className="bg-transparent px-0">{children}</span></li>;

    return (
        <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle no-animation">
                <div className="indicator">
                    <MdNotificationsNone size={24} />
                    {(notifications.length > 0) ? (
                        <span className="indicator-item badge bg-red-500 text-white">{(noReadNotifications.length > 99) ? '+99' : noReadNotifications.length}</span>
                    ) : null}
                </div>
            </button>
            <ul tabIndex={0} className="mt-3 p-2 px-5 shadow menu menu-compact dropdown-content bg-white-opacity-7 rounded-md w-52 md:w-96">
                <b>Notificações</b>
                {notifications.length == 0 ? <Notification>Nenhuma notificação</Notification> : null}
                {notifications.map(notification => (
                    <Notification>{notification.title}</Notification>
                ))}
            </ul>
        </div>
    );
}