import Payroll from "../models/payroll.model.js";
/**
 * @BANK_NAME
 * @ROUTE {{URL}}/api/v1/Bank/add
 * @description Adds bank details for the user
 * @method POST
 */



export const addBankDetails = async (req, res) => {
    try {
        const { bankName, bankAccount, bankIFSCode } = req.body;
        const employeeId = req.user.id; 

        // Validate required fields
        if (!bankName || !bankAccount || !bankIFSCode ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: bankName, bankAccount, bankIFSCode, bankStatement.",
            });
        }

        // Check if the employee already has bank details
        const existingBankDetails = await Payroll.findOne({ employeeId });
        if (existingBankDetails) {
            return res.status(400).json({
                success: false,
                message: "Bank details already exist for this employee.",
            });
        }

        // Create and save new bank details
        const newPayroll = new Payroll({
            bankName,
            bankAccount,
            bankIFSCode,
            employeeId,
        });

        await newPayroll.save();

        res.status(201).json({
            success: true,
            message: "Bank details added successfully.",
            data: newPayroll,
        });
    } catch (error) {
        console.error("Error adding bank details:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
            error: error.message,
        });
    }
};

/**
 * @BANK_NAME
 * @ROUTE {{URL}}/api/v1/Bank/view
 * @description Retrieves all bank details
 * @method GET
 */
export const viewBankDetails = async (req, res) => {
    try {
        const employeeId = req.user.id; // Assuming `req.user` contains authenticated employee data

        // Find bank details by employeeId
        const bankDetails = await Payroll.findOne({ employeeId });

        // Check if bank details exist
        if (!bankDetails) {
            return res.status(404).json({
                success: false,
                message: "Bank details not found for this employee.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Bank details retrieved successfully.",
            data: bankDetails,
        });
    } catch (error) {
        console.error("Error fetching bank details:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
            error: error.message,
        });
    }
};

/**
 * @BANK_NAME
 * @ROUTE {{URL}}/api/v1/Bank/update
 * @description Updates bank details for the user
 * @method PUT
 */
export const updateBankDetails = async (req, res) => {
    try {
        const { bankName, bankAccount, bankIFSCode } = req.body;
        const employeeId = req.user.id;

        // Check if the bank details exist
        const existingBankDetails = await Payroll.findOne({ employeeId });

        if (!existingBankDetails) {
            return res.status(404).json({
                success: false,
                message: "No bank details found for this employee.",
            });
        }

        // Update the bank details with the provided data
        if (bankName) existingBankDetails.bankName = bankName;
        if (bankAccount) existingBankDetails.bankAccount = bankAccount;
        if (bankIFSCode) existingBankDetails.bankIFSCode = bankIFSCode;

        // Save the updated bank details
        await existingBankDetails.save();

        res.status(200).json({
            success: true,
            message: "Bank details updated successfully.",
            data: existingBankDetails,
        });
    } catch (error) {
        console.error("Error updating bank details:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
            error: error.message,
        });
    }
};

/**
 * @BANK_NAME
 * @ROUTE {{URL}}/api/v1/Bank/delete
 * @description Deletes bank details for the user
 * @method DELETE
 */
export const deleteBankDetails = async (req, res) => {
    try {
        const employeeId = req.user.id;

        // Check if the bank details exist
        const existingBankDetails = await Payroll.findOne({ employeeId });

        if (!existingBankDetails) {
            return res.status(404).json({
                success: false,
                message: "No bank details found for this employee.",
            });
        }

        // Delete the bank details
        await Payroll.deleteOne({ employeeId });

        res.status(200).json({
            success: true,
            message: "Bank details deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting bank details:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
            error: error.message,
        });
    }
};
