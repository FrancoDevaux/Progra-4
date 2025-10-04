import express from "express";
import ordersRouter from "./routes/orders.route";

export function makeApp() {
  const app = express();
  app.use(express.json());
  app.use(ordersRouter);
  return app;
}
