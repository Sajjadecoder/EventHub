import express, { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";
const router = Router();


router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
// router.get("/me",getCurrentUser)

export default router