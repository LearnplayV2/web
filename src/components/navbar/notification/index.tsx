import Link from "next/link";
import { useEffect, useState } from "react";
import { MdNotificationsNone } from "react-icons/md";
import { FaCircle } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Websocket, { socket } from '../../../services/socket';
import NotificationsSocket from "../../../services/socket/notifications";
import { addNotification, NotificationProps, setNotification } from "../../../store/reducers/notification";
import { UserState } from "../../../store/reducers/user";
import UserService from '../../../services/users';

export default function Notifications() {

    const dispatch = useDispatch();

    const { uuid } = useSelector((state: any) => state.user) as UserState;
    const notifications = useSelector((state: any) => state.notificationsReducer.notifications) as NotificationProps[];

    useEffect(() => {
        Websocket.addNewUser(uuid!);
        socket.on('getNotification', (data) => {
            dispatch(setNotification(data));
        });
        socket.on('allNotificationsRead', (data) => {
            dispatch(setNotification(data));
        });
    }, [])

    const noReadNotifications = notifications.filter(notification => !notification.read);;

    const Notification = ({ children, read, id }: { children: React.ReactNode, read: boolean, id: number }) => (
        <li className="flex flex-row bg-zinc-800">
            <div style={{ flexBasis: '15%', position: 'relative' }} >
                <span onClick={async() => {
                    try {
                        const response = await UserService.ToggleNotification(id);

                        dispatch(setNotification(response.data))
                    } catch(err) {
                        console.log(err);
                    }
                }}>
                    {read ? (
                        <FaCircle size={8} fill="#ccc" className="mr-3 inline cursor-pointer hover:opacity-70" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                    ) : (
                        <FaCircle size={8} fill="rgb(16 185 129)" className="mr-3 inline cursor-pointer hover:opacity-70" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                    )}
                </span>
            </div>
            <div className="py-3.5 px-1 text-sm" style={{ flexBasis: '100%' }}>
                {children}
            </div>
        </li>
    );

    const NotificationWrapper = ({ notification }: { notification: NotificationProps }) => {
        return notification.description ? (
            <Notification read={notification.read} id={notification.id}>
                <Link href={`/dashboard/notification/${notification.id}`}>
                    <a className="text-white">
                        {notification.title}
                    </a>
                </Link>
            </Notification>
        ) :
            <Notification id={notification.id} read={notification.read}>{notification.title}</Notification>
            ;
    }

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
            <ul tabIndex={0} className="bg-light mt-3 z-50 shadow dropdown-content rounded-md w-52 md:w-96">
                <div className="px-5 mb-3 py-5 pb-2 flex justify-between">
                    <b>Notificações</b>
                    <span
                        onClick={() => {
                            NotificationsSocket.makeAllNotificationsRead({ uuid: uuid! });
                        }}
                        className="cursor-pointer text-sm select-none text-slate-400 hover:text-slate-300"
                    >
                        Marcar todas como lida
                    </span>
                </div>
                {notifications.length == 0 ? <div className="p-2 px-5">Nenhuma notificação</div> : null}
                {notifications.map((notification, i) => {
                    // return last 5 records
                    return (i < 5) ? (<NotificationWrapper notification={notification} />) : null
                })}
            </ul>
        </div>
    );
}