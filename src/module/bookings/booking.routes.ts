import express from 'express';
import { bookingControllers } from './booking.controllers';

const router = express.Router();

router.post('/',bookingControllers.createBooking);
router.get('/',bookingControllers.getAllBookings);


export const bookingRoutes = router;