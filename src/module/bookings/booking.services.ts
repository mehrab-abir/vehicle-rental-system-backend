import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicle = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id=$1`,
    [vehicle_id],
  );

  const updated_status = "booked";

  //* updating availability_status of the vehicle to "booked"
  await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [
    updated_status,
    vehicle_id,
  ]);

  //* total price
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  const total_days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  const total_price = total_days * Number(vehicle.rows[0].daily_rent_price);

  const status = "active";

  //* creating a booking
  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ],
  );

  return {
    bookingInfo: result,
    vehicle,
  };
};

const getAllBookings = async (info: Record<string, any>) => {
  let result;

  if (info.role === "customer") {
    const customer_id = Number(info.id);
    result = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [
      customer_id,
    ]);
  }
  else{
    result = await pool.query(`SELECT * FROM bookings`);
  }

  return result;  
};

const updateBooking = async(booking_id:number,payload:Record<string,string>)=>{
  const {status} = payload;

  const booking = await pool.query(`SELECT * FROM bookings WHERE id=$1`,[booking_id]);

  const vehicleId = booking.rows[0].vehicle_id;

  const updatedBooking = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`, [status,booking_id]);

  const updatedVehicleStatus = await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,["available",vehicleId]);

  return {updatedBooking, updatedVehicleStatus}
}

export const bookingServices = {
  createBooking,
  getAllBookings,
  updateBooking
};
