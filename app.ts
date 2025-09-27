import express, { Express } from "express";
import { inializeWebsocketIO } from "./websocket.io.server.js";
import http from "http";
import { configureMiddleware } from "./middleware-config.js";
import { routesConfigMiddleware } from "./routes-config.js";
import config from "./config.js";

const app: Express = express();
const server = http.createServer(app);

configureMiddleware(app);
routesConfigMiddleware(app);

export const { io, orderService } = inializeWebsocketIO(server);

app.listen(config.port, () => {
  console.log(`Backend server running on http://localhost:${config.port}`);
});
