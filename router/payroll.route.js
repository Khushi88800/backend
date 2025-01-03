import { Router } from "express";
import {
    addBankDetails,
    deleteBankDetails,
    updateBankDetails,
    viewBankDetails
} from "../controller/payroll.controller.js";
import { isLoggedInMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/Bank/add', isLoggedInMiddleware, addBankDetails);
router.get("/Bank/view", isLoggedInMiddleware, viewBankDetails);
router.put("/Bank/:id", isLoggedInMiddleware, updateBankDetails);
router.delete("/Bank/:id", isLoggedInMiddleware, deleteBankDetails)

export default router;