import SocketIO from "socket.io";
export abstract class MessageHandler {
    public static handlers: Array<MessageHandler> = []
    constructor(server: SocketIO.Server) {
    };
    abstract handleConnection(socket: SocketIO.Socket): void;
    abstract verifyConnection(socket: SocketIO.Socket): boolean;
}