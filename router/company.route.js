import { Router } from "express";
import { createCompany, deleteCompany, getCompanyById, updateCompany } from "../controller/company.controller.js";
import { isLoggedInMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/create', createCompany);
router.delete('/:id', deleteCompany);
router.get("/:id", isLoggedInMiddleware, getCompanyById)
router.put('/:id', updateCompany);


export default router;