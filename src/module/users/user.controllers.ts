import { Request, Response } from "express";
import { userServices } from "./user.services";

const getAllUsers = async(req:Request, res: Response)=>{
    try{
        const result = await userServices.getAllUsers();

        if(result.rowCount === 0){
            return res.json({
                message : "no user found"
            })
        }
        
        res.status(200).json({
            success : true,
            message : "Users retrived successfully",
            data : result.rows
        })
    }
    catch(err:any){
        res.status(404).json({
            success : false,
            message : "no users found",
            error: err.message
        })
    }
}

export const userControllers = {
    getAllUsers
}