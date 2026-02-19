import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
import config from "../../config/config";

const signUp = async (payload: Record<string, string>) => {
  const { name, email, password, phone, role } = payload;

  const formattedEmail = email!.toLowerCase();

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const afterRegister = await pool.query(
    `INSERT INTO users(name,email,role,phone,password) VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role`,
    [name, formattedEmail, role, phone, hashedPassword],
  );

  return afterRegister;
};

const signIn = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) {
    return false;
  }

  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    config.jwt_secret as string,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user,
  };
};

export const authServices = {
  signUp,
  signIn,
};
