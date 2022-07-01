import WebSocket, {socket} from ".";

class NotificationsSocket extends WebSocket {

    public static sendNotification = ({ uuid, message }: { uuid: string, message: string }) => {
        socket.emit('sendNotification', { uuid, message });
    }

    public static makeAllNotificationsRead = (data : {uuid: string}) => {
        socket.emit('makeAllNotificationsRead', data);
    }
    
}

export default NotificationsSocket;