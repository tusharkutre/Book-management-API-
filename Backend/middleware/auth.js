import { Router } from "express";
import { getAuthMe, logoutUser, postLogin, postRegister } from "../controllers/auth.controller.js";

const router = Router();

//login controller function for login page
// loginData? --> "app enter" : "stick to the <Login/> page only"

router.post('/login' , postLogin);
router.post('/register', postRegister);

// Auth check endpoint - relies on verifyAuthentication middleware setting req.user
router.get('/auth/me', getAuthMe);
router.get('/logout', logoutUser);

export const authRoutes = router; //renaming the router as authRoutes