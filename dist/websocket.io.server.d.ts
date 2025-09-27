import { Server } from "socket.io";
import { OrderService } from "./services/websockets.io.service.js";
export declare const inializeWebsocketIO: (server: any) => {
    io: Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
    orderService: OrderService;
};
//# sourceMappingURL=websocket.io.server.d.ts.map