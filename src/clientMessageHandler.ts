import { MessageHandler } from "./messageHandler";
import SocketIO from "socket.io";

export class ClientMessageHandler extends MessageHandler {
    constructor(server: SocketIO.Server) {
        super(server);
    }
    handleConnection(socket: SocketIO.Socket): void {
        socket.join("client");
    }
    verifyConnection(socket: SocketIO.Socket): boolean {
        return socket.handshake.auth.type == "client";
    }
}