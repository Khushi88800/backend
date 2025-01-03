import jwt from 'jsonwebtoken'
import AppError from '../utlis/appError.js'

export const isLoggedInMiddleware = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError('You are not logged in. Please log in to access this route', 401));
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return next(new AppError("Unauthorized, please login to continue", 401));
    }
    req.user = decoded;

    next();
}
// Middleware to check if user is admin or not
export const authorizeRoles = (...roles) =>
    async (req, _res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError("You do not have permission to view this route", 403)
            );
        }

        next();
    };