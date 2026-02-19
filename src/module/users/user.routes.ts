import express from "express";
import { userControllers } from "./user.controllers";
import { verifyToken } from "../../middlewares/verifyToken";

const router = express.Router();

router.get("/", userControllers.getAllUsers);
router.patch('/:userId',verifyToken, userControllers.updateUser);
router.delete('/:userId', userControllers.deleteUser);

export const userRoutes = router;
