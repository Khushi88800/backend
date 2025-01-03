import { Router } from 'express';
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployeeById,
    updateEmployeeById
} from '../controller/employee.controller.js'

const router = Router();

router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.delete('/:id', deleteEmployeeById);
router.put('/:id', updateEmployeeById);
router.post('/', createEmployee);

export default router;