import { io, Socket } from "socket.io-client";

//@ts-ignore
export const socket : Socket = io(process.env.SOCKET_URL);

class WebSocket {
    
    public static addNewUser = (email: string) => {
        socket.emit('newUser', email);
    }

}

export default WebSocket;