import { Request, Response } from "express";
import Comment from "../models/comment.model";

export const getComments = async (req: Request, res: Response) => {
  try {
    const projectId = req.query.projectId;
    const comments = await Comment.find({ projectId });
    res.json(comments);
  } catch (error) {
    errorHandling(error, res);
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { author, projectId, content, clientId, admin } = req.body;

    const comment = new Comment({ author, projectId, content, clientId, admin });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    errorHandling(error, res);
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { content } = req.body;

    const comment = await Comment.findByIdAndUpdate(id, { content });

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.json(comment);
  } catch (error) {
    errorHandling(error, res);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.json({ message: "Comment deleted" });
  } catch (error) {
    errorHandling(error, res);
  }
};


const errorHandling = (error: any, res: Response) => {
  console.error("Error:", error);
  res.status(500).json({ message: "Server error" });
};
