# 🚗 Vehicle Rental System – Backend API

A RESTful backend API for managing a vehicle rental platform.  
The system supports **user authentication**, **role-based authorization**, **vehicle inventory management**, and **rental bookings with automatic price calculation**.

---

### Base API URL: 
#### -> https://vehicle-rental-system-backend-lyart.vercel.app/

---

## Features

### Authentication & Authorization
- User registration and login with **JWT authentication**
- Secure password hashing using **bcrypt**
- **Role-based access control** (Admin & Customer)
- Protected routes using JWT middleware

### Vehicle Management (Admin)
- Add, update, retrieve, and delete vehicles
- Track vehicle availability (`available` / `booked`)
- Prevent deletion of vehicles with active bookings

### User Management
- Admin can manage all users
- Customers can update **only their own profile**
- Enforced authorization at route level

### Booking System
- Create vehicle bookings with date validation
- **Automatic total price calculation**
- Vehicle availability auto-updates on booking / return
- Role-based booking views:
  - Admin → all bookings
  - Customer → own bookings only
- Booking status handling:
  - `active`
  - `cancelled`
  - `returned`

### Business Rules
- Vehicles cannot be booked if already booked
- Bookings cannot overlap
- Vehicles return to `available` when booking ends or is cancelled
- Users / vehicles with active bookings cannot be deleted

---

## Technology Stack

**Backend**
- Node.js
- TypeScript
- Express.js

**Database**
- PostgreSQL
- SQL constraints & relational integrity

**Security**
- bcrypt (password hashing)
- JSON Web Tokens (JWT)

**Tooling**
- tsx (watch mode for development)
- dotenv (environment variables)

---
> Modular, feature-based architecture with clear separation of concerns.
---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/mehrab-abir/vehicle-rental-system-backend
cd vehicle-rental-system-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a .env file in the root directory:  

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5000/vehicle_rental
JWT_SECRET=your_secret_key

## Author
### Mehrab Jalil Abir </br>
Full-Stack Developer
