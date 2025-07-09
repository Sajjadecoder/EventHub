import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";
import { bookEvent, cancelBooking, getAllEducationEvents, getAllEntertainmentEvents, getAllHealthEvents, getAllTechEvents, getBookings } from "../controllers/user.controller.js";

const router  = Router()

router.get("/get-tech-events",getAllTechEvents)
router.get("/get-education-events",getAllEducationEvents)
router.get("/get-health-events",getAllHealthEvents)
router.get("/get-entertainment-events",getAllEntertainmentEvents)
router.get("/get-bookings",getBookings)
router.delete("/cancel-booking",cancelBooking)
router.post("/book-event",isLoggedIn,bookEvent)

export default router