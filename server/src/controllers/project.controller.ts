import { Request, Response } from "express";
import Project from "../models/project.model";
import Comment from "../models/comment.model";
import Task from "../models/task.model";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projectId = req.query.projectId;
    const projects = await Project.find({ projectId }).select(
      "_id name description image startDate endDate status tasksCounter"
    );
    res.json(projects);
  } catch (error) {
    errorHandling(error, res);
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const project = await Project.findOne({ _id: id })
      .populate("client")
      .select(
        "_id userId client name description image startDate endDate status"
      );
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    const comments = await Comment.find({ projectId: id });

    res.json(project);
  } catch (error) {
    errorHandling(error, res);
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      client,
      name,
      description,
      image,
      startDate,
      endDate,
      status,
    } = req.body;

    const project = new Project({
      userId,
      client,
      name,
      description,
      image,
      startDate,
      endDate,
      status,
    });

    await project.save();
    res.status(201).json({ message: "Project created", data: project });
  } catch (error) {
    errorHandling(error, res);
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const {
      userId,
      clientId,
      name,
      description,
      image,
      startDate,
      endDate,
      status,
    } = req.body;

    const project = await Project.findByIdAndUpdate(id, {
      userId,
      clientId,
      name,
      description,
      image,
      startDate,
      endDate,
      status,
    });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json({ message: "Project updated", data: project });
  } catch (error) {
    errorHandling(error, res);
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json({ message: "Project deleted" });
  } catch (error) {
    errorHandling(error, res);
  }
};

const errorHandling = (error: any, res: Response) => {
  console.error("Error:", error);
  res.status(500).json({ message: "Server error" });
};
