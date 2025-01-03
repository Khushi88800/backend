import { Router } from "express";
import {
    createLeaveApplication,
    deleteLeaveApplication,
    getAllLeaveApplications,
    getLeaveApplicationById,
    updateLeaveApplication,
    updateLeaveStatus
} from "../controller/LeaveApplicationController.js";
import { authorizeRoles, isLoggedInMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/create', isLoggedInMiddleware, createLeaveApplication);
router.get('/get-leave', getAllLeaveApplications);
router.get('/get-leave/:id', getLeaveApplicationById);
router.put('/:id', updateLeaveApplication);
router.delete('/:id', deleteLeaveApplication);
router.post('/update-status', isLoggedInMiddleware, authorizeRoles('ADMIN'), updateLeaveStatus);

export default router;