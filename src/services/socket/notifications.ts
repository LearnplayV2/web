import { Socket } from "socket.io-client";

class WebSocket {

    private socket : Socket;

    constructor(socket : Socket) {
        this.socket = socket;
    }

    public addNewUser = (email: string) => {
        this.socket.emit('newUser', email);
    }

    public sendNotification = ({email, message} : {email: string, message: string}) => {
        this.socket.emit('sendNotification', {email, message});
    }
    
}

export default (socket : Socket) => new WebSocket(socket);