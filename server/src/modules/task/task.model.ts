import mongoose from "mongoose";
import type { ITask } from "./task.type.js";

const taskSchema = new mongoose.Schema<ITask>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const TaskModel: mongoose.Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default TaskModel;
