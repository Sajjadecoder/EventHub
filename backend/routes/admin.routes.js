import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { createEvent, deleteEvent, getAdminNames, getAllEvents, getEventsCreated, } from "../controllers/admin.controller.js";

const router = Router()

router.post("/create-event", isLoggedIn, isAdmin, createEvent)
router.get("/get-events-created", isLoggedIn, isAdmin,getEventsCreated)//events created by admin with a id
router.get("/admin-names",getAdminNames)
router.get("/get-all-events",getAllEvents)
router.post("/delete-event",deleteEvent)

export default router