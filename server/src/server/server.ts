import express, { urlencoded } from "express";
import cors from "cors";
import userRoutes from "../routes/user.routes";
import clientRoutes from "../routes/client.routes";
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

app.use("/api/clients", clientRoutes);

// Rutas
app.use("/api/user", userRoutes);

app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
