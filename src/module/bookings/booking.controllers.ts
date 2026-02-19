import { Request, Response } from "express";
import { bookingServices } from "./booking.services";
import { AuthRequest } from "../../middlewares/verifyToken";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    if(result.status === "booked"){
      return res.json({
        success : false,
        message : "this vehicle is already booked"
      })
    }

    const vehicle = result.vehicle!.rows[0];

    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      data: {
        ...result.bookingInfo!.rows[0],
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

const getAllBookings = async (req: AuthRequest, res: Response) => {

  if(!req.user){
    return res.status(401).json({
      message : "unauthorized"
    })
  }

  try {
    const bookings = await bookingServices.getAllBookings(req.user);

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

const updateBooking = async(req: AuthRequest, res:Response)=>{

  if(!req.user){
    return res.status(401).json({
      message : "unauthorized"
    })
  }

  const booking_id = Number(req.params.bookingId);

  try{
    const result = await bookingServices.updateBooking(booking_id, req.body);
    
    if(req.user.role === "customer"){
      return res.json({
        success : true,
        message : "Booking cancelled successfully",
        data : {
          ...result.updatedBooking.rows[0],
        }
      })
    }

    return res.json({
      success: true,
      message: "Booking marked as returned. Vehicle is now available",
      data: {
        ...result.updatedBooking.rows[0],
        vehicle : {
          availability_status : result.updatedVehicleStatus.rows[0].availability_status
        }
      }
    });
  }
  catch{
    res.status(500).json({
      success : false,
      message : "something went wrong, booking status not updated"
    })
  }
}


export const bookingControllers = {
  createBooking,
  getAllBookings,
  updateBooking
};
