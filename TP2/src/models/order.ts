import { z } from "zod";

export const Valid_Toppings = ["cebolla","4 quesos","huevos","tomate","aceitunas"] as const;

export const OrderSchema = z.object({
    id: z.string().uuid(),
    size: z.enum(["S", "M", "L"]),
    toppings: z.array(z.enum(Valid_Toppings)).min(1).max(5),
    address: z.string().min(10),
    status: z.enum(["pendiente", "entregado", "cancelado"]).default("pendiente"),
    price: z.number().positive(),
});

export type Order = z.infer<typeof OrderSchema>;
export type Topping = z.infer<typeof OrderSchema>["toppings"][number];
