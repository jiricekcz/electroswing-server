import SocketIO from "socket.io"
import { MessageHandler } from "./messageHandler"
export class ElectroswingMessageHandler extends MessageHandler {
    private readonly electroSwingKey = "electroSwingKey111";
    constructor(private readonly server: SocketIO.Server) {
        super(server);
    }
    handleConnection(socket: SocketIO.Socket): void {
        socket.join("electroswing");
        socket.on("frame", (data: Frame) => this.handleData(data));
    }
    verifyConnection(socket: SocketIO.Socket): boolean {
        return socket.handshake.auth.type == "electroswing" && socket.handshake.auth.key == this.electroSwingKey;
    }
    handleData(data: Frame): void {
        this.server.to("client").emit("frame", data);
    }
}
interface Frame {
    rotation: number;
    position: number;
}