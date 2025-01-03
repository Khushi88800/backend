import { Router } from "express";
import {
    createSalary,
    deleteSalary,
    getSalary,
    updateSalary
} from "../controller/salary.controller.js";

const router = Router();
router.post('/create', createSalary);
router.get('/getSalary', getSalary);
router.put('/updateSalary/:id', updateSalary);
router.delete('/deleteSalary/:id', deleteSalary);

export default router;