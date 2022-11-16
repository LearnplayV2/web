import {Socket, io} from 'socket.io-client';

const socket : Socket = io(import.meta.env.VITE_SOCKET_SERVER);

class WebSocket {
    
    static emit(event: string, data: any) {
        socket.emit(event, data);
    }

    static addNewUser(email: string) {
        socket.emit('newUser', email);
    }

}

export {WebSocket};