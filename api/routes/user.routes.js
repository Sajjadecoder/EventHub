import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";
import { bookEvent, cancelBooking, getEvents, getBookings } from "../controllers/user.controller.js";

const router  = Router()

router.get("/get-events",getEvents)
router.get("/get-bookings",getBookings)
router.delete("/cancel-booking",cancelBooking)
router.post("/book-event",isLoggedIn,bookEvent)

export default router