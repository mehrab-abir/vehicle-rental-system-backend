import express from "express";
import { vehicleControllers } from "./vehicle.controllers";
import { verifyToken } from "../../middlewares/verifyToken";
import { verifyRole } from "../../middlewares/verifyRole";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  verifyRole("admin"),
  vehicleControllers.createVehicle,
);

router.get("/", vehicleControllers.getAllVehicles);

router.get("/:vehicleId", vehicleControllers.getOneVehicle);

router.patch(
  "/:vehicleId",
  verifyToken,
  verifyRole("admin"),
  vehicleControllers.updateVehicle,
);

router.delete(
  "/:vehicleId",
  verifyToken,
  verifyRole("admin"),
  vehicleControllers.deleteVehicle,
);

export const vehicleRoutes = router;
