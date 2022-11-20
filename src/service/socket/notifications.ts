import { WebSocket } from ".";
import { Session } from "../../authentication";

interface SendNotification {
    message: string;
    description?: string;
    userId?: string,
}

class Notifications {

    static recover(callback: any) {
        return WebSocket.on('getNotification', callback);
    }
    
    static makeAllRead(data : {uuid: string}) {
        WebSocket.emit('makeAllNotificationsRead', data);
    }

    static send(props: SendNotification) {
        const user = Session.user();
        WebSocket.emit('sendNotification', {...props, uuid: props?.userId ?? user.uuid});
    }
    
}

export {Notifications};