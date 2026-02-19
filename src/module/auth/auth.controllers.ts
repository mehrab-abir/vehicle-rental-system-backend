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

const signIn = async(req:Request, res:Response)=>{
  const {email,password} = req.body;

  try{
    const result = await authServices.signIn(email,password);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      message: "Login successfull",
      data: {
        token: result.token,
        user: result.user,
      },
    });
  }
  catch(err:any){
    res.status(400).json({
      message : "failed sign in"
    })
  }
}

export const authControllers = {
  signUp,
  signIn
};
