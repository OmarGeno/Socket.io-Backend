export class CustomError extends Error {
  statusCode: number;
  status: boolean;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? false : true;

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
