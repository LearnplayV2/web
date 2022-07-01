import { useEffect, useState } from "react";
import { MdNotificationsNone } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Websocket, { socket } from '../../../services/socket';
import NotificationsSocket from "../../../services/socket/notifications";
import { addNotification, NotificationProps, setNotification } from "../../../store/reducers/notification";
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
        socket.on('allNotificationsRead', (data) => {
            dispatch(setNotification(data));
        });
    }, [])

    const noReadNotifications = notifications.filter(notification => !notification.read);;
    
    const Notification = ({children} : {children: React.ReactNode}) => <li><span className="py-3.5 px-5 bg-zinc-800 hover:bg-zinc-700">{children}</span></li>;

    return (
        <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle no-animation">
                <div className="indicator">
                    <MdNotificationsNone size={24} />
                    {(noReadNotifications.length > 0) ? (
                        <span className="indicator-item badge bg-red-500 text-white">{(noReadNotifications.length > 99) ? '+99' : noReadNotifications.length}</span>
                    ) : null}
                </div>
            </button>
            <ul tabIndex={0} className="bg-light mt-3 z-50 shadow menu menu-compact dropdown-content rounded-md w-52 md:w-96">
                <div className="px-5 mb-3 py-5 pb-2 flex justify-between">
                    <b>Notificações</b>
                    <span 
                    onClick={() => {
                        NotificationsSocket.makeAllNotificationsRead({uuid: uuid!});
                    }}
                    className="cursor-pointer select-none text-slate-400 hover:text-slate-300"
                    >
                        Marcar todas como lida
                    </span>
                </div>
                {notifications.length == 0 ? <Notification>Nenhuma notificação</Notification> : null}
                {notifications.map((notification, i) => {
                    return (i < 5) ? <Notification>{notification.title}</Notification> : null
                })}
            </ul>
        </div>
    );
}