import { NextFunction, Response } from "express"
import { AuthRequest } from "./verifyToken"

export const verifyRole = (...roles:string[])=>{
    return (req:AuthRequest, res:Response, next:NextFunction)=>{
        if(!req.user){
            return res.status(401).json({
                message : "unauthorized access"
            })
        }

        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message : "forbidden access"
            })
        }

        next();
    }
}