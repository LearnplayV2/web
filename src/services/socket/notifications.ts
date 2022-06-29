import { Socket } from "socket.io-client";

class WebSocket {

    private socket : Socket;

    constructor(socket : Socket) {
        this.socket = socket;
    }

    public addNewUser = (email: string) => {
        this.socket.emit('newUser', email);
    }
    
}

export default (socket : Socket) => new WebSocket(socket);