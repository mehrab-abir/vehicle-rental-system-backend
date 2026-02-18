import bcrypt from 'bcryptjs';
import { pool } from '../../config/db';

const signUp = async(payload:Record<string, string>)=>{
    const {name, email, password, phone, role} = payload;

    const formattedEmail = email!.toLowerCase();

    const hashedPassword = await bcrypt.hash(password as string,10);

    const afterRegister = await pool.query(
      `INSERT INTO users(name,email,role,phone,password) VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role`,
      [name, formattedEmail, role, phone, hashedPassword],
    );

    return afterRegister;
}

export const authServices = {
    signUp
}