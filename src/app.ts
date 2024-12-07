import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import path from 'path';
import imageRoutes from './routes/imageRoutes';
import orderRoutes from './routes/orderRoutes';

// Conectar a la base de datos
connectDB();

// Crear aplicación Express
const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:3000", // URL del front
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeceras permitidas
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta estática para los uploads
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// Rutas del backend
app.use('/api/images', imageRoutes); // Ruta para manejar imágenes
app.use(orderRoutes);

// Servir la build del frontend
const frontBuildPath = path.join(__dirname, '../frontend-build');
app.use(express.static(frontBuildPath));

// Middleware para rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(frontBuildPath, 'index.html'));
});


// Iniciar servidor
app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
