import { Request, Response } from "express";
import { OrdersService } from "../services/orders.service";
import { OrderSchema } from "../models/order";

export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  create = (req: Request, res: Response) => {
    const result = OrderSchema.omit({id: true, status: true, price: true}).safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({error: result.error});
    }
    const order = this.ordersService.create(result.data);
    res.status(201).json(order);
  }

  getById = (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
      return res.status(400).json({error: "Order id requerido"});
    }
    const order = this.ordersService.getById(id);
    if (!order) {
      return res.status(404).json({error: "Order no encontrada"});
    }
    res.json(order);
  }

  cancel = (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
      return res.status(400).json({error: "Order id requerido"});
    }
    try {
      const order = this.ordersService.cancel(id);
      res.json(order);
    } catch (error) {
      if (error instanceof Error && error.message === "No se puede cancelar un pedido entregado") {
        return res.status(409).json({error: error.message});
      }
      return res.status(404).json({error: error instanceof Error ? error.message : String(error)});
    }
  }

  getByStatus = (req: Request, res: Response) => {
    const orders = this.ordersService.getByStatus(req.query.status as string);
    res.json(orders);
  }

  markAsDelivered = (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
      return res.status(400).json({ error: "Order id requerido" });
    }
    try {
      const order = this.ordersService.markAsDelivered(id);
      res.json(order);
    } catch (error) {
      if (error instanceof Error && error.message === "No se puede marcar como entregado un pedido cancelado") {
        return res.status(409).json({ error: error.message });
      }
      return res.status(404).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

}
