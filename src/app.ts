import express from "express";
import { initDB } from "./config/db";
import { authRoutes } from "./module/auth/auth.routes";

const app = express();
app.use(express.json());

initDB();

app.use("/api/v1/auth", authRoutes);

export default app;
