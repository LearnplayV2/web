import { MdNotificationsNone } from "react-icons/md";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import onReady from "../../../hooks/loadOnce";
import Socket from '../../../services/socket/notifications';
import { UserState } from "../../../store/user/userReducer";

export default function Notifications() {

    const {email} = useSelector((state : any) => state.user) as UserState;  
    
    const Notification = ({children} : {children: React.ReactNode}) => <li><span className="bg-transparent px-0">{children}</span></li>;

    onReady(() => { 
        //@ts-ignore
        const socket = io(process.env.SOCKET_URL);
        Socket(socket).addNewUser(email!);
    }, [])
    
    return (
        <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle no-animation">
                <div className="indicator">
                    <MdNotificationsNone size={24} />
                </div>
            </button>
            <ul tabIndex={0} className="mt-3 p-2 px-5 shadow menu menu-compact dropdown-content bg-white-opacity-7 rounded-md w-52 md:w-96">
                <b>Notificações</b>
                <Notification>Em construção.</Notification>
            </ul>
        </div>
    );
}