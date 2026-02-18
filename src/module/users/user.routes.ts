import express from "express";
import { userControllers } from "./user.controllers";

const router = express.Router();

router.get("/", userControllers.getAllUsers);

export const userRoutes = router;
