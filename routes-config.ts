import express, { Request, Response } from "express";
import ioRoutes from "./routes/io.js";

export const routesConfigMiddleware = (app: express.Express) => {
  app.use("/io", ioRoutes);
};
