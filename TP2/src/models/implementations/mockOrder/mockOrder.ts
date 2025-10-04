import {Order, Valid_Toppings} from "../../order";

let orders: Order[] = [];

const SIZE_PRICES = {S:10, M:15, L:20};

const TOPPING_PRICES: Record<string, number> = {"4 quesos":3, "cebolla":2, "huevos":1.5, "aceitunas":3,};

export const mockOrderCrud = {
    create: (order: Omit<Order, "id" | "status" | "price">): Order => {
        const invalidToppings = order.toppings.filter(topping => !Valid_Toppings.includes(topping as any));
        
        if (invalidToppings.length > 0) {
            throw new Error(`Toppings inválidos: ${invalidToppings.join(", ")}`);
        }

        const basePrice = SIZE_PRICES[order.size];
        const toppingsPrice = order.toppings.reduce((total, topping) => {
            return total + (TOPPING_PRICES[topping] || 0);
        }, 0);
        const totalPrice = basePrice + toppingsPrice;

        const newOrder: Order = {
            ...order,
            id: crypto.randomUUID(),
            status: "pendiente",
            price: totalPrice,
        };
        orders.push(newOrder);
        return newOrder;
    },

    getById: (id: string): Order | undefined => orders.find((o) => o.id === id),
    
    cancel: (id: string): Order | undefined => {
        const order = orders.find((o) => o.id === id);
        if (order && order.status !== "entregado") {
            order.status = "cancelado";
            return order;
        }
        return undefined;
    },
    
    getByStatus: (status: string): Order[] => orders.filter((o) => o.status === status),

    markAsDelivered: (id: string): Order | undefined => {
        const order = orders.find((o) => o.id === id);
        if (order && order.status !== "cancelado") {
            order.status = "entregado";
            return order;
        }
        return undefined;
    },

    
    clear: () => {
        orders = [];
    }
};