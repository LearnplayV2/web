import { Socket } from "socket.io-client";

class WebSocket {

    private socket : Socket;

    constructor(socket : Socket) {
        this.socket = socket;
    }

    public addNewUser = (email: string, socketId: string) => {
        this.socket.emit('newUser', {email, socketId});
    }
    
}

export default (socket : Socket) => new WebSocket(socket);