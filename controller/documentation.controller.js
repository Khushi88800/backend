import EmployeeDocument from "../models/documentation.model.js";
import AppError from "../utlis/appError.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';
/**
 * @ALL_Documents
 * @ROUTE @GET {{URL}}/api/v1/documents
 * @ACCESS Public
 */

export const getAllDocuments = async (req, res, _next) => {
    try {
        const documents = await EmployeeDocument.find();

        res.status(200).json({
            success: true,
            message: 'All documents',
            data: documents,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

/**
 * @CREATE_Documents
 * @ROUTE @POST {{URL}}/api/v1/create
 * @ACCESS 
 */
export const CreateDocuments = async (req, res, next) => {
    const { panCard, address, dateOfBirth, city, state, zipCode, phone, department } = req.body;
    console.log(req.body);
    if (!panCard || !address || !dateOfBirth || !city || !state || !zipCode || !phone || !department) {
        return next(new AppError('All fields are required 👍', 400));
    }

    const document = await EmployeeDocument.create({
        panCard,
        phone,
        department,
        address,
        dateOfBirth,
        city,
        state,
        zipCode
    })
    if (!document) {
        return next(new AppError('Failed to create EmployeeDocuments', 400));
    }
    console.log(req.file)
    await document.save();
    res.status(201).json({
        success: true,
        message: 'Employee Documents created successfully',
        data: document
    });
}

/**
 * @Delete Employee
 * @ROUTE @POST {{URL}}/api/v1/delete
 * @ACCESS 
 */
export const deleteEmployee = async (req, res,next) => {
    try {
        const { id } = req.body;
        if (!id) {
            return next(new AppError('Please provide the ID of the employee', 400));
        }
        const document = await EmployeeDocument.findByIdAndDelete(id);
        if (!document) {
            return next(new AppError('No employee found with that ID', 404));
        }
        res.status(200).json({
            success: true,
            message: 'Employee deleted successfully',
            data: null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Cannot delete the employee documents' });
    }

}