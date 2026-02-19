import { Request, Response } from "express";
import { userServices } from "./user.services";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();

    if (result.rowCount === 0) {
      return res.json({
        message: "no user found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users retrived successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: "no users found",
      error: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.userId);

  try {
    const result = await userServices.updateUser(id, req.body);

    if(result.rowCount !== 1){
        return res.status(500).json({
            success : false,
            message : "user was not updated"
        })
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        ...result.rows[0],
        id: Number(result.rows[0].id),
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong, update failed",
    });
  }
};

export const userControllers = {
  getAllUsers,
  updateUser,
};
