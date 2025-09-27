import { Server, Socket } from "socket.io";
export interface Order {
    orderId: string;
    customerId: string;
    restaurantId: string;
    items: any[];
    placedAt?: Date;
    updatedAt?: Date;
    status: string;
}
export declare class OrderService {
    private orders;
    private nextId;
    private io;
    private userSockets;
    constructor(io: Server);
    placeOrder: (order: Omit<Order, "orderId" | "placedAt" | "status">) => Order;
    getOrderById: (orderId: string) => Order | undefined;
    getAllOrders: () => Order[];
    updateOrderStatus: (orderId: string, status: string) => Order | undefined;
    deleteOrder: (orderId: string) => boolean;
    registerClient: (socket: Socket, userId: string) => void;
}
//# sourceMappingURL=websockets.io.service.d.ts.map