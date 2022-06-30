import WebSocket, {socket} from ".";

class NotificationsSocket extends WebSocket {
    
    public static sendNotification = ({ uuid, message }: { uuid: string, message: string }) => {
        socket.emit('sendNotification', { uuid, message });
    }
}

export default NotificationsSocket;