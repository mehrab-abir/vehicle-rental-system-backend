import express from "express";
import { userControllers } from "./user.controllers";
import { verifyToken } from "../../middlewares/verifyToken";
import { verifyRole } from "../../middlewares/verifyRole";

const router = express.Router();

router.get("/",verifyToken, verifyRole("admin"), userControllers.getAllUsers);

router.patch('/:userId',verifyToken,userControllers.updateUser);

router.delete('/:userId', verifyToken, verifyRole("admin"), userControllers.deleteUser);

export const userRoutes = router;
