import { Router } from "express";
import { OrdersController } from "../controllers/orders.controller";
import { OrdersService } from "../services/orders.service";
import { mockOrderCrud } from "../models/implementations/mockOrder/mockOrder";

const orderRoute = Router();
const ordersService = new OrdersService(mockOrderCrud);
const ordersController = new OrdersController(ordersService);

orderRoute.post("/orders", ordersController.create)
orderRoute.get("/orders/:id", ordersController.getById)
orderRoute.post("/orders/:id/cancel", ordersController.cancel)
orderRoute.get("/orders", ordersController.getByStatus)
orderRoute.post("/orders/:id/entregado", ordersController.markAsDelivered)

export default orderRoute;
