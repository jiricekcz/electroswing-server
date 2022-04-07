import SocketIO from "socket.io";
import {ConnectionHandler } from "./connectionHandler"
const socketServer = new SocketIO.Server(3000, {
    cors: {
        origin: "*",
    }
});


const connectionHandler = new ConnectionHandler(socketServer);  