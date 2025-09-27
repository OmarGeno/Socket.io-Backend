import { Address } from "./address.js";
import { OrderItem } from "./order-Item.js";

export interface Order {
  orderId: string;
  customerId: string;
  restaurantId: string;
  items: OrderItem[];
  deliveryAddress: Address;
  status:
    | "pending"
    | "accepted"
    | "preparing"
    | "out-for-delivery"
    | "delivered"
    | "cancelled";
  paymentMethod: "cash" | "card";
  totalAmount: number;
  placedAt: Date;
  updatedAt?: Date;
}
