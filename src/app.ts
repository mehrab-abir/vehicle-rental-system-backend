import express from "express";
import { initDB } from "./config/db";
import { authRoutes } from "./module/auth/auth.routes";
import { vehicleRoutes } from "./module/vehicles/vehicle.routes";
import { userRoutes } from "./module/users/user.routes";
import { bookingRoutes } from "./module/bookings/booking.routes";

const app = express();
app.use(express.json());

initDB();

//* auth routes
app.use("/api/v1/auth", authRoutes);

//* vehicle routes
app.use("/api/v1/vehicles",vehicleRoutes);

//* user routes
app.use("/api/v1/users", userRoutes);

//* booking routes
app.use("/api/v1/bookings",bookingRoutes);

export default app;
