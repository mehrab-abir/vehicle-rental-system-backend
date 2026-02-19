import { Request, Response } from "express";
import { bookingServices } from "./booking.services";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    const vehicle = result.vehicle.rows[0];

    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      data: {
        ...result.bookingInfo.rows[0],
        vehicle,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "booking creation failed",
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingServices.getAllBookings();

    res.status(200).json({
      success: true,
      message: "Bookings retrived successfully",
      data: bookings.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong, no bookings retrived",
    });
  }
};

export const bookingControllers = {
  createBooking,
  getAllBookings,
};
