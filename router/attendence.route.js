import { Router } from "express";
import { clockIn, clockOut, getAttendanceHistory } from "../controller/attendence.controller.js";
import { isLoggedInMiddleware } from "../middleware/auth.middleware.js";


const router = Router();

router.post('/clock-in', isLoggedInMiddleware, clockIn);
router.post('/clock-out', isLoggedInMiddleware, clockOut);
router.get("/get",isLoggedInMiddleware,getAttendanceHistory)

export default router;