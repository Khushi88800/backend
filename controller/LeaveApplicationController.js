import leaveApplication from "../models/leaveApplication.model.js";
import userModel from "../models/user.model.js";

const calculateLeaveDays = (fromDate, toDate, isHalfDay) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
        throw new Error('Invalid dates provided');
    }

    const timeDifference = to - from;
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;

    return isHalfDay ? 0.5 : days;
};

export const createLeaveApplication = async (req, res) => {
    try {
        // Get the logged-in user (employee) ID from req.user
        const employeeId = req.user.id;  // Assuming 'id' is the employee's ID from the decoded JWT
        const { leaveType, fromDate, toDate, isHalfDay, halfDayType, reason, workingFromHome } = req.body;

        // Check if the employee exists
        const employeeExists = await userModel.findById(employeeId);
        if (!employeeExists) {
            return res.status(400).json({ error: 'Employee not found' });
        }

        const from = new Date(fromDate);
        const to = new Date(toDate);
        if (isNaN(from.getTime()) || isNaN(to.getTime())) {
            return res.status(400).json({ error: 'Invalid fromDate or toDate' });
        }

        const numberOfDays = calculateLeaveDays(fromDate, toDate, isHalfDay);

        const newLeaveApplication = new leaveApplication({
            employee: employeeId,  // Associate the employee's ID
            employeeName: employeeExists.fullName,  // Save the employee's name for admin visibility
            leaveType,
            fromDate,
            toDate,
            isHalfDay,
            halfDayType: isHalfDay ? halfDayType : null,
            numberOfDays,
            reason,
            workingFromHome,
        });

        const savedApplication = await newLeaveApplication.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        console.error('Error creating leave application:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getAllLeaveApplications = async (req, res) => {
    try {
        const applications = await leaveApplication.find()
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching leave applications:', error);
        res.status(500).json({ error: error.message });
    }
};


// Get a single leave application by ID
export const getLeaveApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await leaveApplication.findById(id);
        if (!application) {
            return res.status(404).json({ error: 'Leave application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        console.error('Error fetching leave application:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update a leave application
export const updateLeaveApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // Validate updated dates if present
        if (updatedData.fromDate || updatedData.toDate) {
            const from = new Date(updatedData.fromDate);
            const to = new Date(updatedData.toDate);
            if (isNaN(from.getTime()) || isNaN(to.getTime())) {
                return res.status(400).json({ error: 'Invalid fromDate or toDate' });
            }
        }

        const updatedApplication = await leaveApplication.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedApplication) {
            return res.status(404).json({ error: 'Leave application not found' });
        }
        res.status(200).json(updatedApplication);
    } catch (error) {
        console.error('Error updating leave application:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a leave application
export const deleteLeaveApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedApplication = await leaveApplication.findByIdAndDelete(id);
        if (!deletedApplication) {
            return res.status(404).json({ error: 'Leave application not found' });
        }
        res.status(200).json({ message: 'Leave application deleted successfully' });
    } catch (error) {
        console.error('Error deleting leave application:', error);
        res.status(500).json({ error: error.message });
    }
};
//status
export const updateLeaveStatus = async (req, res) => {
    try {
        const { leaveId, status } = req.body;

        // Ensure only admin can update the status
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'You do not have permission to update the leave status' });
        }

        // Find the leave application by ID (don't modify the employee field)
        const leave = await leaveApplication.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ error: 'Leave application not found' });
        }

        leave.status = status;

        // Save the leave application with updated status
        await leave.save();

        res.status(200).json({
            message: 'Leave status updated successfully',
            leave: {
                id: leave._id,
                employee: leave.employee, 
                status: leave.status,
                startDate: leave.startDate,
                endDate: leave.endDate,
                reason: leave.reason,
            },
        });
    } catch (error) {
        console.error('Error updating leave status:', error);
        res.status(500).json({ error: error.message });
    }
};