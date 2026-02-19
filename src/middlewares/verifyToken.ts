import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import config from "../config/config";

interface jwtpayload {
    name: string;
    email : string;
    role : "admin" | "customer";
}

export interface AuthRequest extends Request{
    user? : jwtpayload;
}

export const verifyToken = async(req:AuthRequest,res:Response, next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if(!token){
        return res.status(401).send({message : "unauthorized access"});
    }

    try{
        const decoded = jwt.verify(token, config.jwt_secret as string) as jwtpayload;
        req.user = decoded;
        next();
    }
    catch(err:any){
        return res.status(401).send({ message: "unauthorized access" });
    }
}