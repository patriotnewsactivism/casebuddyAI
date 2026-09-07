import express, { type NextFunction, type Request, type Response } from "express";
import { registerRoutes } from "../server/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "casebuddy-ai" });
});

// registerRoutes currently performs all route registration synchronously and
// returns a resolved Promise containing the Node HTTP server used outside Vercel.
// Vercel only needs the configured Express app, so no top-level await is needed.
void registerRoutes(app).catch((error) => {
  console.error("[api] failed to register routes", error);
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const error = err as { status?: number; statusCode?: number; message?: string };
  const status = error.status || error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  console.error("[api] unhandled error", err);
  res.status(status).json({ message });
});

export default app;
