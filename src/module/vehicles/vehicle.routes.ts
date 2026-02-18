import express from 'express';
import { vehicleControllers } from './vehicle.controllers';

const router = express.Router();

router.post('/',vehicleControllers.createVehicle);
router.get('/',vehicleControllers.getAllVehicles);
router.get('/:vehicleId', vehicleControllers.getOneVehicle);
router.patch('/:vehicleId', vehicleControllers.updateVehicle);
router.delete('/:vehicleId',vehicleControllers.deleteVehicle);



export const vehicleRoutes = router;