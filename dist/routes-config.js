import ioRoutes from "./routes/io.js";
export const routesConfigMiddleware = (app) => {
    app.use("/io", ioRoutes);
};
//# sourceMappingURL=routes-config.js.map