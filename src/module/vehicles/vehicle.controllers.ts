import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.services";

const createVehicle = async(req:Request, res:Response)=>{
    try{
        const result = await vehicleServices.createVehicle(req.body);

        if(result.rowCount === 1){
            return res.status(201).json({
              success: true,
              message: "Vehicle created successfully",
              data: result.rows[0]
            });
        }
        else{
            return res.status(500).json({
                success : false,
                message : "vehicle creation failed"
            })
        }
    }
    catch(err:any){
        res.status(500).json({
            success : false,
            message : "something went wrong"
        })
    }
}

const getAllVehicles = async(req:Request, res:Response)=>{
    try{
        const result = await vehicleServices.getAllVehicles();
        res.status(200).json({
            success: true,
            message : "Vehicles retrieved successfully",
            data : result.rows
        })
    }
    catch(err:any){
        res.status(404).json({
            success : false,
            message : "something went wrong, no vehicles retrieved"
        })
    }
}

const getOneVehicle = async(req:Request, res:Response)=>{
    const id = Number(req.params.vehicleId);

    try{
        const result = await vehicleServices.getOneVehicle(id);

        if(result.rows.length === 0){
            return res.status(404).json({
                success : false,
                message : "vehicle not found"
            })
        }

        res.status(200).json({
          success: true,
          message: "Vehicle retrieved successfully",
          data: {
            ...result.rows[0],
            daily_rent_price: Number(result.rows[0].daily_rent_price),
          }
        });
    }
    catch(err:any){
        res.status(500).json({
            success : false,
            message : "something went wrong, vehicle not found"
        })
    }
}

const updateVehicle = async(req:Request, res:Response)=>{
    const id = Number(req.params.vehicleId);

    try{
        const result = await vehicleServices.updateVehicle(id,req.body);

        res.status(200).json({
          success: true,
          message: "Vehicle updated successfully",
          data: {
            ...result.rows[0],
            daily_rent_price: Number(result.rows[0].daily_rent_price),
          },
        });
    }
    catch(err:any){
        res.status(500).json({
            success : false,
            message : "something went wrong, vehicle update failed"
        })
    }
}

const deleteVehicle = async(req:Request, res:Response)=>{
    const id = Number(req.params.vehicleId);

    try{
        const result = await vehicleServices.deleteVehicle(id);

        if(!result){
            return res.status(400).json({
                success : false,
                message : "this vehicle has active booking, can't be deleted now"
            })
        }

        if(result.rowCount === 0){
            return res.status(404).json({
                success : false,
                message : "vehicle not found"
            })
        }

        res.status(200).json({
          success: true,
          message: "Vehicle deleted successfully",
        });
    }
    catch(err:any){
        res.status(500).json({
            success : false,
            message : "something went wrong, vehicle was not deleted"
        })
    }
}

export const vehicleControllers = {
    createVehicle,
    getAllVehicles,
    getOneVehicle,
    updateVehicle,
    deleteVehicle
}