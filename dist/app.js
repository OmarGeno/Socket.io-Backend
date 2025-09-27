import express from "express";
import { inializeWebsocketIO } from "./websocket.io.server.js";
import http from "http";
import { configureMiddleware } from "./middleware-config.js";
import { routesConfigMiddleware } from "./routes-config.js";
import config from "./config.js";
const app = express();
const server = http.createServer(app);
configureMiddleware(app);
routesConfigMiddleware(app);
export const { io, orderService } = inializeWebsocketIO(server);
// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//   const err = new CustomError("Not found", 404);
//   next(err);
// });
server.listen(config.port, () => {
    console.log(`Backend server running on http://localhost:${config.port}`);
});
//# sourceMappingURL=app.js.map