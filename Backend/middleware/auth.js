import { Router } from "express";
import { loginController , registerController } from "../controllers/auth.controller.js";

const router = Router();

//login controller function for login page
// loginData? --> "app enter" : "Go to the <Register/> page"
router.get('/login' , loginController);
router.get('/register', registerController);

export const authRoutes = router;