import SocketIO from 'socket.io';
import { MessageHandler } from './messageHandler';
export class AdminMessageHandler extends MessageHandler {
    private readonly adminKey: string = "adminKey111";
    constructor(private readonly server: SocketIO.Server) {
        super(server);
    }

    handleConnection(socket: SocketIO.Socket) {
        socket.join("admin");
    }
    verifyConnection(socket: SocketIO.Socket): boolean {
        return socket.handshake.auth.type == "admin" && socket.handshake.auth.key == this.adminKey;
    }

    private handleAdminMessage(socket: SocketIO.Socket, message: string) {
        console.log(`Admin message: ${message}`);
    }
}