import { Request, Response } from "express";
import { userServices } from "./user.services";
import { AuthRequest } from "../../middlewares/verifyToken";

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

const updateUser = async (req: AuthRequest, res: Response) => {

  if(!req.user){
    return res.status(401).json({
      message : "unauthorized access"
    })
  }

  const id = Number(req.params.userId);

  // console.log(req.user);
  
  if(id !== req.user.id && req.user.role !== "admin"){
    return res.status(401).json({
      message : "not your profile"
    })
  }

  try {
    const result = await userServices.updateUser(id, req.body);

    if (result.rowCount !== 1) {
      return res.status(500).json({
        success: false,
        message: "user was not updated",
      });
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

const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.userId);

  try {
    const result = await userServices.deleteUser(id);

    if(!result){
      return res.status(400).json({
        success : false,
        message : "this user has active booking, can't be deleted now"
      })
    }

    if(result.rowCount !== 1){
        return res.status(500).json({
            success : false,
            message : "no user was deleted"
        })
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong, user not deleted",
    });
  }
};

export const userControllers = {
  getAllUsers,
  updateUser,
  deleteUser,
};
