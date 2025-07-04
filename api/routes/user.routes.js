import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { getAllEducationEvents, getAllEntertainmentEvents, getAllHealthEvents, getAllTechEvents } from "../controllers/user.controller.js";

const router  = Router()

router.get("/get-tech-events",getAllTechEvents)
router.get("/get-education-events",getAllEducationEvents)
router.get("/get-health-events",getAllHealthEvents)
router.get("/get-entertainment-events",getAllEntertainmentEvents)

export default router