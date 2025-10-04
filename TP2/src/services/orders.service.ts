import { OrderCrud } from "../models/interface/orderCrud.interface";
import { Order } from "../models/order";

export class OrdersService {
    constructor(private orderCrud: OrderCrud) { }

    create(order: Omit<Order, "id" | "status" | "price">): Order {
        return this.orderCrud.create(order);
    }

    getById(id: string): Order | undefined {
        return this.orderCrud.getById(id);
    }

    cancel(id: string): Order | undefined {
        const order = this.orderCrud.getById(id);
        if (!order) {
            throw new Error("Order no encontrada");
        }
        if (order.status === "entregado") {
            throw new Error("No se puede cancelar un pedido entregado");
        }
        return this.orderCrud.cancel(id);
    }

    getByStatus(status: string): Order[] {
        return this.orderCrud.getByStatus(status);
    }

    markAsDelivered(id: string): Order | undefined {
        const order = this.orderCrud.getById(id);
        if (!order) {
            throw new Error("Order no encontrada");
        }
        if (order.status === "cancelado") {
            throw new Error("No se puede marcar como entregado un pedido cancelado");
        }
        return this.orderCrud.markAsDelivered(id);
    }
}