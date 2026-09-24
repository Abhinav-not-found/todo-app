import { Router } from "express";
import TaskModel from "./task.model.js";

const test = TaskModel.findByIdAndUpdate;

const taskRouter = Router();

// const createTaskSchema = z.object({
//   name: z.string(),
//   description: z.string(),
// });

//Create a task
taskRouter.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newTask = await TaskModel.create(data);

    return res.status(201).json({
      message: "task created successfully",
      success: true,
      data: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error,
    });
  }
});

// Get all tasks
taskRouter.get("/", async (_req, res) => {
  try {
    const allTasks = await TaskModel.find();

    return res.status(200).json({
      message: "all tasks fetched successfully",
      success: true,
      data: allTasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

// Update a task
taskRouter.patch("/:id", async (req, res) => {
  try {
    const data = req.body;

    const { id } = req.params;

    const updateTask = await TaskModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updateTask) {
      return res.status(404).json({
        message: "task not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Task updated",
      success: true,
      data: updateTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error,
    });
  }
});

// Delete a task
taskRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTask = await TaskModel.findByIdAndDelete(id);

    if (!deleteTask) {
      return res.status(404).json({
        message: "task not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Task deleted",
      success: true,
      data: deleteTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

export default taskRouter;
