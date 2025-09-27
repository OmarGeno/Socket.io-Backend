import express, { Request, Response } from "express";
export declare const placeOrder: (req: Request, res: Response) => void;
export declare const getOrder: (req: Request, res: Response) => express.Response<any, Record<string, any>> | undefined;
export declare const getOrders: (req: Request, res: Response) => void;
export declare const updateOrder: (req: Request, res: Response) => express.Response<any, Record<string, any>> | undefined;
export declare const deleteOrder: (req: Request, res: Response) => express.Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=websocket.io.controller.d.ts.map