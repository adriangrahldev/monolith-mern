import express, { urlencoded } from "express";
import cors from "cors";
import clientRoutes from "../routes/client.routes";
import projectRoutes from "../routes/project.routes";
import commentRoutes from "../routes/comment.routes";
import taskRoutes from "../routes/task.routes";
import dotenv from "dotenv";
import errorHandler from "../middleware/errorHandler";
dotenv.config();

// Connectar a MongoDB
require(".././config/mongodb.config");

// Inicializar Express
const app = express();

// Middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
//Configutar cors
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

// Rutas
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
