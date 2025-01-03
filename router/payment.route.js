import { Router } from "express";
import {
    authorizeSubscribers,
    isLoggedInMiddleware
} from "../middlewares/auth.middleware";
import {
    cancelSubscription,
    getRazorpayApiKey
} from "../controller/payment.controller";

const router = Router();

router
    .route('/unsubscribe')
    .post(isLoggedInMiddleware, authorizeSubscribers, cancelSubscription);
router.route('/razorpay-key').get(isLoggedInMiddleware, getRazorpayApiKey);

export default router;