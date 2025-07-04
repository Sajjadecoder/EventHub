import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { createEvent } from "../controllers/admin.controller.js";

const router  = Router()

router.post("/create-event", isLoggedIn,isAdmin,createEvent)


export default router