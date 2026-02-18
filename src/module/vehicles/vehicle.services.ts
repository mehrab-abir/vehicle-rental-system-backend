import { pool } from "../../config/db"

const createVehicle = async(payload:Record<string,unknown>)=>{
    const {vehicle_name,type,registration_number,daily_rent_price,availability_status} = payload;

    const result = await pool.query(
      `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`,[vehicle_name,type, registration_number, daily_rent_price,availability_status]
    );

    return result;
}

const getOneVehicle = async(id:number)=>{
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`,[id]);
    return result;
}

const getAllVehicles = async()=>{
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result;
}

export interface updatedInfo {
  vehicle_name?: string;
  type?: string;
  registration_number?: string;
  daily_rent_price?: number;
  availability_status?: "available" | "booked";
}

const updateVehicle = async(id:number, data:updatedInfo)=>{
    const fields = [];
    const values = [];
    let index = 1; //for placeholder

    for(const [key,value] of Object.entries(data)){
        if(value !== undefined){
            fields.push(`${key} = $${index}`); //name=$1, type=$2...
            values.push(value);
            index++;
        }
    }

    if(fields.length === 0){
        throw new Error("No value provided");
    }

    values.push(id);

    const result = await pool.query(`UPDATE vehicles SET ${fields.join(',')} WHERE id=$${index} RETURNING *`,values);

    return result;
}

const deleteVehicle = async(id:number)=>{
    const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`,[id]);
    return result;
}

export const vehicleServices = {
    createVehicle,
    getAllVehicles,
    getOneVehicle,
    updateVehicle,
    deleteVehicle
}