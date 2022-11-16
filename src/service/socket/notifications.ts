import { WebSocket } from ".";
import { Session } from "../../authentication";

interface NotificationProps { message: string, description: string };

interface SendNotification {
    message: string;
    description?: string;
    userId?: string,
}

class Notifications {

    static makeAllRead(data : {uuid: string}) {
        WebSocket.emit('makeAllNotificationsRead', data);
    }

    static send(props: SendNotification) {
        const user = Session.user();
        WebSocket.emit('sendNotification', {...props, uuid: props?.userId ?? user.uuid});
    }
    
}

export {Notifications};