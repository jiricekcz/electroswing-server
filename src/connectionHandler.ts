import SocketIO from 'socket.io';
import { AdminMessageHandler } from './adminMessageHandler';
import { ClientMessageHandler } from './clientMessageHandler';
import { ElectroswingMessageHandler } from './electroswingMessageHandler';
import { MessageHandler } from './messageHandler';

const handlers: Map<string, typeof MessageHandler> = new Map();
handlers.set("admin", AdminMessageHandler);
handlers.set("electroswing", ElectroswingMessageHandler);
handlers.set("client", ClientMessageHandler);

export class ConnectionHandler {
    constructor(public readonly server: SocketIO.Server) {
        server.on("connection", (socket) => this.handleConnection(socket));
    }

    handleConnection(socket: SocketIO.Socket) {
        const Handler = handlers.get(socket.handshake.auth.type);
        if (!Handler) {
            console.log(`Unknown auth type: ${socket.handshake.auth.type}`);
            return;
        }
        // @ts-expect-error 
        const handlerInstance: MessageHandler = new Handler(this.server);

        if(!handlerInstance.verifyConnection(socket)) {
            socket.disconnect();
            return;
        }
        console.log(`New ${socket.handshake.auth.type} connection.`);
        handlerInstance.handleConnection(socket);
    }
}