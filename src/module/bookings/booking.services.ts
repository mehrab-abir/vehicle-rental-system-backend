import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicle = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id=$1`,
    [vehicle_id],
  );

  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  const total_days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  const total_price = total_days * Number(vehicle.rows[0].daily_rent_price);

  const status = "active";

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

export const bookingServices = {
  createBooking,
};
