const errorHandler = (err, req, res, next) => {
    const defaultMessage = "We're having technical issues. Please try again later";
    const { status = 500, message, error } = err; // Default status to 500 if not provided

   // More detailed logging in development
    if (process.env.NODE_ENV === 'development' && error) {
        console.error('Detailed Error:', error);
    }
    // Optionally include error details in development
    const responseBody = process.env.NODE_ENV === 'development'
        ? { message: message || defaultMessage, error: error?.message }
        : { message: message || defaultMessage };
    
    res.status(status).json(responseBody);
};

export default errorHandler;