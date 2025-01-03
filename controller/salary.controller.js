import SalaryData from "../models/Salary.models.js";
import AppError from "../utlis/appError.js";
/**
 * @CREATE_SALARY
 * @ROUTE @POST {{URL}}/api/v1/salary/create
 * @ACCESS Private
 */

export const createSalary = async (req, res,next) => {
    const { name, type, amount, date, details } = req.body;
    try {
        if (!name || !type || !amount || !date || !details) {
            return next(new AppError('All fields are required 👍', 400));
        }
        const salary = await SalaryData.create({
            name,
            type,
            amount,
            date,
            details,
        })
        if (!salary) {
            return next(new AppError('Failed to create salary data', 400));
        }
        await salary.save()
        res.status(201).json({
            success: true,
            message: 'Salary data created successfully',
            data: salary
        });
    } catch (error) {
        return next(
            new AppError(error || 'Error for creating salary, please try again', 400)
        );
    }
}

/**
 * @Get_SALARY
 * @ROUTE @GET {{URL}}/api/v1/salary/create
 * @ACCESS Private
 */

export const getSalary = async (req, res, next) => {
    try {
        const salary = await SalaryData.find({});
        if (!salary) {
            return next(new AppError('No salary data found', 404));
        }
        res.status(200).json({
            success: true,
            message: 'Salary data fetched successfully',
            data: salary
        });
    } catch (error) {
        return next(
            new AppError(error || 'Error for fetching salary, please try again', 400)
        );
    }
}

/**
 * @UPDATE_SALARY
 * @ROUTE @PUT {{URL}}/api/v1/salary/:id
 * @ACCESS Private
 */
export const updateSalary=async (req, res, next) => {
    const { name, type, amount, date, details } = req.body;
    try {
        const salary = await SalaryData.findByIdAndUpdate(req.params.id, {
            name,
            type,
            amount,
            date,
            details,
        }, { new: true });
        if (!salary) {
            return next(new AppError('No salary data found with that ID', 404));
        }
        res.status(200).json({
            success: true,
            message: 'Salary data updated successfully',
            data: salary
        });
    } catch (error) {
        return next(
            new AppError(error || 'Error for updating salary, please try again', 400)
        );
    }
}

/**
 * @DELETE_SALARY
 * @ROUTE @DELETE {{URL}}/api/v1/salary/:id
 * @ACCESS Private
 */

export const deleteSalary = async (req, res, next) => {
    try {
        const salary = await SalaryData.findByIdAndDelete(req.params.id);
        if (!salary) {
            return next(new AppError('No salary data found with that ID', 404));
        }
        res.status(200).json({
            success: true,
            message: 'Salary data deleted successfully',
        });
    } catch (error) {
        return next(
            new AppError(error || 'Error for deleting salary, please try again', 400)
        );
    }
}
