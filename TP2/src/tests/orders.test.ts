import { describe, test, expect, beforeEach } from "vitest";
import request from "supertest";
import { makeApp } from "../app";
import { mockOrderCrud } from "../models/implementations/mockOrder/mockOrder";
import { Valid_Toppings } from "../models/order";

describe("Orders API", () => {
    const app = makeApp();

    beforeEach(() => {
        mockOrderCrud.clear();
    });

    test("Debería crear un pedido con toppings válidos", async () => {
        const response = await request(app)
            .post("/orders")
            .send({
                size: "M",
                toppings: ["cebolla", "tomate"],
                address: "Avenida Mitre 1234",
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.toppings).toEqual(["cebolla", "tomate"]);
    });

    test("No se debe crear un pedido con toppings vacíos", async () => {
        const response = await request(app)
            .post("/orders")
            .send({
                size: "M",
                toppings: [],
                address: "Avenida Mitre 1234",
            });
        expect(response.status).toBe(422);
    });

    test("No se debe crear un pedido con toppings inválidos", async () => {
        const response = await request(app)
            .post("/orders")
            .send({
                size: "M",
                toppings: ["pepperoni", "cebolla"],
                address: "Av. Corrientes 1234",
            });
        expect(response.status).toBe(422);
    });

    test("No se debe crear un pedido con más de 5 toppings", async () => {
        const response = await request(app)
            .post("/orders")
            .send({
                size: "M",
                toppings: ["cebolla", "4 quesos", "huevos", "tomate", "queso" ,"aceitunas"],
                address: "Avenida Mitre 1234",
            });
        expect(response.status).toBe(422);
    });

    test("Debería calcular correctamente el precio con toppings", async () => {
        const response = await request(app)
            .post("/orders")
            .send({
                size: "M",
                toppings: ["4 quesos", "cebolla"],
                address: "Avenida Mitre 1234",
            });
        expect(response.status).toBe(201);
        expect(response.body.price).toBe(20);
    });

  
    test("No se debe cancelar un pedido entregado", async () => {
        const createResponse = await request(app)
            .post("/orders")
            .send({
                size: "M",
                toppings: ["4 quesos", "cebolla"],
                address: "Avenida Mitre 1234"
            });
        const orderId = createResponse.body.id;


        await request(app).post(`/orders/${orderId}/entregado`);

        //que fallar
        const cancelResponse = await request(app)
            .post(`/orders/${orderId}/cancel`);
        expect(cancelResponse.status).toBe(409);
    });

    test("Debería marcar un pedido como entregado", async () => {
        
        const createResponse = await request(app)
            .post("/orders")
            .send({
                size: "M",
                toppings: ["4 quesos", "cebolla"],
                address: "Avenida Mitre 1234"
            });
        const orderId = createResponse.body.id;

        const deliverResponse = await request(app)
            .post(`/orders/${orderId}/entregado`);
        expect(deliverResponse.status).toBe(200);
        expect(deliverResponse.body.status).toBe("entregado");
    });

    test("No se debe marcar como entregado un pedido cancelado", async () => {
        const createResponse = await request(app)
            .post("/orders")
            .send({
                size: "M",
                toppings: ["4 quesos", "cebolla"],
                address: "Avenida Mitre 1234"
            });
        const orderId = createResponse.body.id;

        await request(app).post(`/orders/${orderId}/cancel`);

        // fallaria
        const deliverResponse = await request(app)
            .post(`/orders/${orderId}/entregado`);
        expect(deliverResponse.status).toBe(409);
    });

});

describe("Toppings válidos", () => {
    test("debería tener los toppings correctos", () => {
        expect(Valid_Toppings).toEqual([
            "cebolla",
            "4 quesos", 
            "huevos",
            "tomate",
            "aceitunas"
        ]);
    });
});