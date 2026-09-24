import express, { type Application } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(process.cwd(), "public");

const staticMiddleware = (app: Application) => {
  app.use(express.static(publicPath));

  app.get("/{*splat}", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/health")) {
      return next();
    }

    res.sendFile(path.join(publicPath, "index.html"));
  });
};

export default staticMiddleware;
