import { Server } from "socket.io";
import { OrderService } from "./services/websockets.io.service.js";

export const inializeWebsocketIO = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // allow all origins (adjust for production)
    },
  });

  const orderService = new OrderService(io);

  // --- WebSocket setup ---
  io.on("connection", (socket) => {
    console.log("⚡ Client connected");

    // Expect the client to send its userId right after connecting
    socket.on("register", (userId: string) => {
      orderService.registerClient(socket, userId);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected");
    });
  });
  return { io, orderService };
};
