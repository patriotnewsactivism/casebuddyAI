import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true,
  ) {
    super(message);
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized access") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Access forbidden") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        type: err.name,
        message: err.message,
        statusCode: err.statusCode,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
      },
    });
  }

  // Handle Zod validation errors
  if (err.name === "ZodError") {
    return res.status(400).json({
      error: {
        type: "ValidationError",
        message: "Validation failed",
        details: err.message,
        statusCode: 400,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
      },
    });
  }

  // Handle multer errors
  if (err.name === "MulterError") {
    return res.status(400).json({
      error: {
        type: "FileUploadError",
        message: err.message,
        statusCode: 400,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
      },
    });
  }

  // Log unexpected errors
  console.error("Unexpected error:", {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  // Production error response
  const isProduction = process.env.NODE_ENV === "production";
  const message = isProduction
    ? "An unexpected error occurred. Please try again later."
    : err.message;

  return res.status(500).json({
    error: {
      type: "InternalServerError",
      message,
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method,
      ...(isProduction ? {} : { stack: err.stack }),
    },
  });
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
