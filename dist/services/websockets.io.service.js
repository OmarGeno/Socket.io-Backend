export class OrderService {
    constructor(io) {
        this.orders = [];
        this.nextId = 1;
        this.userSockets = {};
        this.placeOrder = (order) => {
            this.nextId++;
            const newOrder = {
                ...order,
                orderId: `ORD${this.nextId.toString().padStart(6, "0")}`,
                placedAt: new Date(),
                status: "pending",
            };
            this.orders.push(newOrder);
            console.log(`📢 Sending order ${newOrder.orderId} to restaurant ${newOrder.restaurantId}`);
            // 🔔 Notify only the restaurant
            const restaurantSocket = this.userSockets[newOrder.restaurantId];
            if (restaurantSocket) {
                restaurantSocket.emit("ReceiveOrder", newOrder);
            }
            else {
                console.log(`⚠️ Restaurant ${order.restaurantId} not connected`);
            }
            return newOrder;
        };
        this.getOrderById = (orderId) => {
            return this.orders.find((o) => o.orderId === orderId);
        };
        this.getAllOrders = () => {
            return this.orders;
        };
        this.updateOrderStatus = (orderId, status) => {
            const existingOrder = this.orders.find((o) => o.orderId === orderId);
            if (!existingOrder)
                return undefined;
            existingOrder.status = status;
            existingOrder.updatedAt = new Date();
            // 🔔 Notify only the customer
            const customerSocket = this.userSockets[existingOrder.customerId];
            if (customerSocket) {
                customerSocket.emit("ReceiveOrderStatus", existingOrder);
            }
            else {
                console.log(`⚠️ Customer ${existingOrder.customerId} not connected`);
            }
            return existingOrder;
        };
        this.deleteOrder = (orderId) => {
            const index = this.orders.findIndex((o) => o.orderId === orderId);
            if (index === -1)
                return false;
            this.orders.splice(index, 1);
            return true;
        };
        // Called when a client connects
        this.registerClient = (socket, userId) => {
            // If user already connected, disconnect old socket
            if (this.userSockets[userId]) {
                console.log(`🔁 User ${userId} reconnected. Closing old socket.`);
                this.userSockets[userId].disconnect(true);
            }
            // Save new socket
            this.userSockets[userId] = socket;
            console.log(`✅ Registered socket for user ${userId}`);
        };
        this.io = io;
    }
}
//# sourceMappingURL=websockets.io.service.js.map