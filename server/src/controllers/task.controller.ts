import { Request, Response } from "express";
import Task from "../models/task.model";


// Function to get all tasks from the database
export const getTasks = async (req: Request, res: Response) => {
  try {
    const projectId = req.query.projectId;

    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (error) {
    errorHandling(error, res);
  }
};

// Function to get a task from the database
export const getTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  } catch (error) {
    errorHandling(error, res);
  }
}
// Function to create a task in the database
export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      status,
      projectId
    } = req.body;

    const task = new Task({
      title,
      description,
      startDate,
      endDate,
      status,
      projectId
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    errorHandling(error, res);
  }
};
// Function to update a task in the database
export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {
      title,
      description,
      startDate,
      endDate,
      status
    } = req.body;
    const task = await Task.findOne({ _id: id });


    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    // Find One And Update no funciona, por eso se hace de esta manera por ahora
    task.title = title;
    task.description = description;
    task.startDate = startDate;
    task.endDate = endDate;
    task.status = status;
    await task.save();

    res.status(200).json(task);
  } catch (error) {

    errorHandling(error, res);
  }
};

// Function to delete a task in the database
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    errorHandling(error, res);
  }
};

// Function to handle errors
const errorHandling = (error: any, res: Response) => {
  console.error("Error:", error);
  res.status(500).json({ message: "Server error" });
};
