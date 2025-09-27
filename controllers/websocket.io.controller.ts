import { io, orderService } from "../app.js";
import express, { Request, Response } from "express";

export const placeOrder = (req: Request, res: Response) => {
  const order = orderService.placeOrder(req.body);
  res.json(order);
};

export const getOrder = (req: Request, res: Response) => {
  const orderId = req.params.id;
  if (orderId) {
    const order = orderService.getOrderById(orderId);
    if (!order) return res.status(404).send("Not found");
    res.json(order);
  } else {
    if (!orderId) return res.status(404).send("Order not found");
  }
};

export const getOrders = (req: Request, res: Response) => {
  res.json(orderService.getAllOrders());
};

export const updateOrder = (req: Request, res: Response) => {
  const orderId = req.params.id;
  if (orderId) {
    const updated = orderService.updateOrderStatus(orderId, req.body.status);
    if (!updated) return res.status(404).send("Not found");
    res.json(updated);
  } else {
    return res.status(404).send("Failed to update");
  }
};

export const deleteOrder = (req: Request, res: Response) => {
  const orderId = req.params.id;
  if (orderId) {
    const deleted = orderService.deleteOrder(orderId);
    res.json({ success: deleted });
  } else {
    return res.status(404).send("Failed to delete");
  }
};
