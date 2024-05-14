import { Request, Response } from "express";
import Client, { IClient } from "../models/client.model";
import Project from "../models/project.model";
import { uploadFile } from "../utils/uploadImage";
import mongoose from "mongoose";

export const getClients = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;
    const clients = await Client.find({ userId }).select(
      "_id name projectsCounter avatar"
    );

    res.json(clients);
  } catch (error) {
    errorHandling(error, res);
  }
};

export const getClient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const client = await Client.findById(id).select(
      "_id name email phone avatar projectsCounter avatar"
    );
    const projects = await Project.find({ client: id }).select(
      "_id name status description completedTasksCounter tasksCounter"
    );
    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }
    const clientData = {
      client,
      projects,
    };
    res.json(clientData);
  } catch (error) {
    errorHandling(error, res);
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, userId } = req.body;
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;
    const images = files?.["image"] as Express.Multer.File[] | undefined;
    let client: IClient;
    if (images && images.length > 0) {
      const { ref, downloadUrl } = await uploadFile(images[0], name, "client");
      client = new Client({
        name,
        email,
        phone,
        userId,
        avatar: downloadUrl,
      });
    } else {
      client = new Client({ name, email, phone, userId });
    }
    await client.save();
    res.status(201).json({ message: "Client created", data: client });
  } catch (error) {
    errorHandling(error, res);
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const id = req.body._id;
    const { name, email, phone } = req.body;
    const client = await Client.findByIdAndUpdate(id, {
      name,
      email,
      phone,
    });
    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }
    res.json({ message: "Client updated", data: client });
  } catch (error) {
    errorHandling(error, res);
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const client = await Client.findByIdAndUpdate(id, { isDeleted: true });
    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }
    res.json({ message: "Client deleted" });
  } catch (error) {
    errorHandling(error, res);
  }
};

const errorHandling = (error: any, res: Response) => {
  console.error("An error occurred:", error);
  if (error.code === 11000) {
    res.status(409).json({ message: "Email already registered" });
    return;
  }
  res.status(500).json({ message: "Internal Server Error" });
};
