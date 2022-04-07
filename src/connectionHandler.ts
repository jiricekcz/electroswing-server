import SocketIO from 'socket.io';
export class ConnectionHandler {
    constructor(public readonly server: SocketIO.Server) {
        server.on("connection", (socket) => this.handleConnection(socket));
    }

    handleConnection(socket: SocketIO.Socket) {
        console.log("New connection");
    }
}