import { Router } from "express";
import {
    getLoggedInUserDetails,
    loginUser,
    logoutUser,
    signupUser
} from "../controller/user.controller.js";

const router = Router();

router.post("/register", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/getUser", getLoggedInUserDetails);

export default router;