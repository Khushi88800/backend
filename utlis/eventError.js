const handleEventErrors = (error, res) => {
    const SchemaErrors = {};
    // Check if the error is a Mongoose validation error
    if (error.errors) {
        // Loop through all validation errors
        Object.keys(error.errors).forEach((key) => {
            SchemaErrors[key] = error.errors[key].message;
        });
        return res.status(400).json(SchemaErrors);
    }

    // Handle other types of errors
    if (error.code === 11000) {
        return res.status(400).json({ error: "Duplicate field value entered" });
    }

    // Default error handler
    return res.status(500).json({ error: "An unexpected error occurred" });
};

export default handleEventErrors;