import express from "express";
import taskRouter from "./modules/task/task.route.js";
import staticMiddleware from "./shared/middlewares/static.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/task", taskRouter);

staticMiddleware(app);

export default app;
