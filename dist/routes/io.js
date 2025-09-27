import express from "express";
import { deleteOrder, getOrder, getOrders, placeOrder, updateOrder, } from "../controllers/websocket.io.controller.js";
const router = express.Router();
router.post("/orders", placeOrder);
router.get("/orders/:id", getOrder);
router.get("/orders", getOrders);
router.put("/orders/:id/status", updateOrder);
router.delete("/orders/:id", deleteOrder);
export default router;
//# sourceMappingURL=io.js.map