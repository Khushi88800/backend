import Company from "../models/company.model.js";

// Create a new company
export const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json({
      message: "Company created successfully",
      data: company,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating company",
      error: error.message,
    });
  }
};



// Get a single company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({
      message: "Company retrieved successfully",
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving company",
      error: error.message,
    });
  }
};

// Update a company by ID
export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({
      message: "Company updated successfully",
      data: company,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating company",
      error: error.message,
    });
  }
};

// Delete a company by ID
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting company",
      error: error.message,
    });
  }
};