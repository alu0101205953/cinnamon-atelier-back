import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; 
import imageRoutes from "./routes/imageRoutes";
import path from "path";

dotenv.config();

const app = express();

// Configura CORS para permitir solicitudes desde tu frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Cambia a tu URL frontend si es necesario
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeceras permitidas
  })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());

// Aplicar el middleware de autenticación a las rutas protegidas
app.use("/api/upload", imageRoutes); // Rutas para imágenes, protegidas por autenticación

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
