import { Router } from "express";
import { CreateDocuments, deleteEmployee, getAllDocuments } from "../controller/documentation.controller.js";

const router = Router();
router.post('/create', CreateDocuments);
router.get('/getDocuments', getAllDocuments);
router.delete('/deleteDocuments/:id', deleteEmployee);

export default router;