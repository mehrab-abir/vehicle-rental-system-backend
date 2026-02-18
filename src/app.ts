import express from "express";
import { initDB } from "./config/db";
import { authRoutes } from "./module/auth/auth.routes";
import { vehicleRoutes } from "./module/vehicles/vehicle.routes";

const app = express();
app.use(express.json());

initDB();

//* auth routes
app.use("/api/v1/auth", authRoutes);


//* vehicle routes
app.use("/api/v1/vehicles",vehicleRoutes);

export default app;
