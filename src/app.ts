import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import path from 'path';
import imageRoutes from './routes/imageRoutes';

// Conectar a la base de datos
connectDB();

// Crear aplicación Express
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // URL del front
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeceras permitidas
  })
);

// Middlewares
app.use(express.json());

const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// Rutas
app.use('/api/images', imageRoutes);

// Iniciar servidor
app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
