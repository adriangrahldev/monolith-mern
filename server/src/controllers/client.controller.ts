import { Request, Response } from "express";
import Client from "../models/client.model";

export const getClients = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;
    const clients = await Client.find({ userId });
    const formattedClients = clients.map((client) =>
      formatClientData(client, "simple")
    );
    res.json(formattedClients);
  } catch (error) {
    errorHandling(error, res);
  }
};

export const getClient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const client = await Client.findById(id);
    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }
    res.json(formatClientData(client));
  } catch (error) {
    errorHandling(error, res);
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, userId } = req.body;
    const client = new Client({ name, email, phone, userId });
    await client.save();
    res
      .status(201)
      .json({ message: "Client created", data: formatClientData(client) });
  } catch (error) {
    errorHandling(error, res);
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
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
    res.json({ message: "Client updated", data: formatClientData(client) });
  } catch (error) {
    errorHandling(error, res);
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const client = await Client.findByIdAndDelete(id);
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
    res.status(400).json({ message: "Email already registered" });
    return;
  }
  res.status(500).json({ message: "Internal Server Error" });
};

function formatClientData(client: any, type: string = "full") {
  if (type === "full")
    return {
      _id: client._id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      avatar: client.avatar,
      projectsCounter: client.projectsCounter,
    };
  if (type === "simple")
    return {
      _id: client._id,
      name: client.name,
      projectsCounter: client.projectsCounter,
      avatar: client.avatar,
    };
}
