import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { createEvent, deleteEvent, getAdminNames, getAllEvents, getEducationEventsCreated, getEntertainmentEventsCreated, getHealthEventsCreated, getTechEventsCreated } from "../controllers/admin.controller.js";

const router = Router()

router.post("/create-event", isLoggedIn, isAdmin, createEvent)
router.get("/get-tech-events-created", isLoggedIn, isAdmin, getTechEventsCreated)
router.get("/get-health-events-created", isLoggedIn, isAdmin, getHealthEventsCreated)
router.get("/get-education-events-created", isLoggedIn, isAdmin, getEducationEventsCreated)
router.get("/get-entertainment-events-created", isLoggedIn, isAdmin, getEntertainmentEventsCreated)
router.get("/admin-names",getAdminNames)
router.get("/get-all-events",getAllEvents)
router.post("/delete-event",deleteEvent)

export default router