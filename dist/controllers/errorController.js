import { CustomError } from "../utils/customError";
import { FirebaseAuthError } from "../utils/customFirebaseError";
export const globalErrorHandler = (error, req, res, next) => {
    let errorMessage;
    let statusCode;
    if (error instanceof CustomError) {
        errorMessage = error.message || 'Internal Server Error';
        statusCode = error.statusCode || 500;
    }
    else if (error instanceof FirebaseAuthError) {
        errorMessage = error.errorCode || 'Unauthorized';
        statusCode = error.statusCode || 401;
    }
    else if (typeof error === 'object' && error && 'code' in error && typeof error.code === 'string' && error.code.startsWith('auth/')) {
        // Handle Firebase errors
        errorMessage = error.errorCode || 'Firebase Error';
        statusCode = 400;
    }
    else {
        errorMessage = typeof error === 'string' ? error : 'Internal Server Error';
        statusCode = typeof error === 'string' ? 500 : error?.statusCode || 500;
    }
    console.log('Error object:', error);
    console.log('Error message:', errorMessage);
    res.status(statusCode).json({
        errorMessage: errorMessage,
        errorName: error?.name || 'UnknownError',
        statusCode: statusCode
    });
};
//# sourceMappingURL=errorController.js.map