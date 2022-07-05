import WebSocket, {socket} from ".";

class NotificationsSocket extends WebSocket {

    public static sendNotification = ({ uuid, message, description }: { uuid: string, message: string, description?: string }) => {
        socket.emit('sendNotification', { uuid, message, description });
    }

    public static makeAllNotificationsRead = (data : {uuid: string}) => {
        socket.emit('makeAllNotificationsRead', data);
    }
    
}

export default NotificationsSocket;