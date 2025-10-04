import { Order } from "../order";

export interface OrderCrud {
    create(order: Omit<Order, "id" | "status" | "price">): Order;
    getById(id: string): Order | undefined;
    cancel(id: string): Order | undefined;
    getByStatus(status: string): Order[];
    markAsDelivered(id: string): Order | undefined;
    
}