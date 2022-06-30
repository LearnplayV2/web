import WebSocket, {socket} from ".";

class NotificationsSocket extends WebSocket {
    
    public static sendNotification = ({ email, message }: { email: string, message: string }) => {
        socket.emit('sendNotification', { email, message });
    }
}

export default NotificationsSocket;