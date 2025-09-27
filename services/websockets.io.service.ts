import { Server, Socket } from "socket.io";
import { Order } from "../models/order.js";

export class OrderService {
  private orders: Order[] = [];
  private nextId = 1;
  private io: Server;
  private userSockets: Record<string, Socket> = {};

  constructor(io: Server) {
    this.io = io;
  }

  placeOrder = (
    order: Omit<Order, "orderId" | "placedAt" | "status">
  ): Order => {
    this.nextId++;
    const newOrder: Order = {
      ...order,
      orderId: `ORD${this.nextId.toString().padStart(6, "0")}`,
      placedAt: new Date(),
      status: "pending",
    };

    this.orders.push(newOrder);

    console.log(
      `📢 Sending order ${newOrder.orderId} to restaurant ${newOrder.restaurantId}`
    );

    // 🔔 Notify only the restaurant
    const restaurantSocket = this.userSockets[newOrder.restaurantId];
    if (restaurantSocket) {
      restaurantSocket.emit("ReceiveOrder", newOrder);
    } else {
      console.log(`⚠️ Restaurant ${order.restaurantId} not connected`);
    }

    return newOrder;
  };

  getOrderById = (orderId: string): Order | undefined => {
    return this.orders.find((o) => o.orderId === orderId);
  };

  getAllOrders = (): Order[] => {
    return this.orders;
  };

  updateOrderStatus = (orderId: string, status: any): Order | undefined => {
    const existingOrder = this.orders.find((o) => o.orderId === orderId);
    if (!existingOrder) return undefined;

    existingOrder.status = status;
    existingOrder.updatedAt = new Date();

    // 🔔 Notify only the customer
    const customerSocket = this.userSockets[existingOrder.customerId];
    if (customerSocket) {
      customerSocket.emit("ReceiveOrderStatus", existingOrder);
    } else {
      console.log(`⚠️ Customer ${existingOrder.customerId} not connected`);
    }

    return existingOrder;
  };

  deleteOrder = (orderId: string): boolean => {
    const index = this.orders.findIndex((o) => o.orderId === orderId);
    if (index === -1) return false;

    this.orders.splice(index, 1);
    return true;
  };

  // Called when a client connects
  registerClient = (socket: Socket, userId: string) => {
    // If user already connected, disconnect old socket
    if (this.userSockets[userId]) {
      console.log(`🔁 User ${userId} reconnected. Closing old socket.`);
      this.userSockets[userId].disconnect(true);
    }

    // Save new socket
    this.userSockets[userId] = socket;

    console.log(`✅ Registered socket for user ${userId}`);
  };
}
