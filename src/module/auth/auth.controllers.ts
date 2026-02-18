import { Request, Response } from "express";
import { authServices } from "./auth.services";

const signUp = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signUp(req.body);

    if (result.rowCount === 1) {
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data : result.rows[0]
      });
    } else {
      res.status(500).json({
        success: false,
        message: "user registration failed",
      });
    }
  } catch (err: any) {
    res.send({
      success: false,
      message: "user registration failed",
      error: err.message,
    });
  }
};

export const authControllers = {
  signUp,
};
