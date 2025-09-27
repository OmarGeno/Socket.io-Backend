export interface Order {
  orderId: string;
  customerId: string;
  restaurantId: string;
  items: any[];
  placedAt?: Date;
  updatedAt?: Date;
  status: string;
}
