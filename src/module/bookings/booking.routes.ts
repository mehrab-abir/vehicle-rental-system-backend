import express from 'express';
import { bookingControllers } from './booking.controllers';
import { verifyToken } from '../../middlewares/verifyToken';

const router = express.Router();

router.post('/',verifyToken, bookingControllers.createBooking);

router.get('/',verifyToken, bookingControllers.getAllBookings);

router.patch('/:bookingId',verifyToken, bookingControllers.updateBooking);


export const bookingRoutes = router;