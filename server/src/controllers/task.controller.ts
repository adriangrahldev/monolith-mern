import { Request, Response } from "express";
import Task from "../models/task.model";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const projectId = req.query.projectId;
    
    const tasks = await Task.find({ projectId});
    res.json(tasks);
  } catch (error) {
    errorHandling(error, res);
  }
};

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

    const task = await Task.findByIdAndUpdate(id, {
      title,
      description,
      startDate,
      endDate,
      status
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  } catch (error) {
    errorHandling(error, res);
  }
};

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


const errorHandling = (error: any, res: Response) => {
  console.error("Error:", error);
  res.status(500).json({ message: "Server error" });
};
