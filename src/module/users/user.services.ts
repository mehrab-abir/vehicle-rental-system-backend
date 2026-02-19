import { pool } from "../../config/db"

const getAllUsers = async()=>{
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}

export interface updateUserInfo {
    name?: string;
    email?: string;
    phone?: string;
    role?: "admin" | "customer";
}
const updateUser = async(id:number,data:updateUserInfo)=>{
    const fields = [];
    const values = [];
    let index = 1; //for placeholder

    for(const [key,value] of Object.entries(data)){
        if(value !== undefined){
            fields.push(`${key} = $${index}`);
            values.push(value);
            index++;
        }
    }

    if(fields.length === 0){
        throw new Error("no data provided");
    }

    values.push(id);

    const result = await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id=$${index} RETURNING *`,values);

    return result;
}

const deleteUser = async(id:number)=>{
    const result = await pool.query(`DELETE FROM users WHERE id=$1`,[id]);
    return result;
}


export const userServices = {
    getAllUsers,
    updateUser,
    deleteUser
}