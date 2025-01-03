import { Router } from "express";
import {
    changePassword,
    forgotPassword,
    getAllUsers,
    getLoggedInUserDetails,
    loginUser,
    logoutUser,
    resetPassword,
    signupUser,
    updateUser
} from "../controller/user.controller.js";
import { isLoggedInMiddleware } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

router.post("/register",upload.single("avatar"), signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/getUser",isLoggedInMiddleware, getLoggedInUserDetails);
router.get("/getAllUsers",getAllUsers)
router.post("/change-password", isLoggedInMiddleware, changePassword);
router.post("/reset", forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.put("/update/:id", isLoggedInMiddleware, upload.single("avatar"), updateUser);

export default router;