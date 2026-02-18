import { NextFunction, Request, Response } from "express";

export const checkRouteHit = (req:Request, res:Response, next: NextFunction)=>{
    console.log("route hitting...");
    next();
}