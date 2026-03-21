import { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import cors from "cors";

// CORS configuration
export const corsConfig = cors({
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.ALLOWED_ORIGINS?.split(",") || []
      : ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
});

// Rate limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "production" ? 100 : 1000, // limit each IP
  message: {
    error: {
      type: "RateLimitError",
      message: "Too many requests from this IP, please try again later.",
      statusCode: 429,
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// File upload limiter (more restrictive)
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: {
      type: "RateLimitError",
      message: "Too many file uploads, please try again later.",
      statusCode: 429,
    },
  },
});

// Security headers with Helmet
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
});

// Request validation middleware
export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (!result.success) {
        const error = new Error("Validation failed");
        error.name = "ZodError";
        error.message = JSON.stringify(result.error.format());
        throw error;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Input sanitization middleware
export const sanitizeInput = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Sanitize request body
  if (req.body) {
    const sanitize = (obj: any): any => {
      if (typeof obj === "string") {
        // Remove potentially harmful characters
        return obj.replace(/[<>]/g, "").trim();
      }
      if (Array.isArray(obj)) {
        return obj.map(sanitize);
      }
      if (obj && typeof obj === "object") {
        return Object.keys(obj).reduce((acc, key) => {
          acc[key] = sanitize(obj[key]);
          return acc;
        }, {} as any);
      }
      return obj;
    };

    req.body = sanitize(req.body);
  }

  // Sanitize query parameters
  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      if (typeof req.query[key] === "string") {
        req.query[key] = (req.query[key] as string).replace(/[<>]/g, "").trim();
      }
    });
  }

  next();
};

// Compression middleware
export const compressResponse = compression();

// Health check endpoint
export const healthCheck = (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version,
  });
};
