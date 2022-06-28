import { MdNotificationsNone } from "react-icons/md";

export default function Notifications() {

    const Notification = ({children} : {children: React.ReactNode}) => <li><span className="bg-transparent px-0">{children}</span></li>;
    
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