import { Router } from 'express';
import { userStats } from '../controller/miscellaneous.controller.js';
import { authorizeRoles, isLoggedInMiddleware } from '../middleware/auth.middleware.js';


const router = Router();

// {{URL}}/api/v1/
router
  .route('/admin/stats/users')
  .get(isLoggedInMiddleware, authorizeRoles('USER', 'ADMIN'), userStats);

export default router;