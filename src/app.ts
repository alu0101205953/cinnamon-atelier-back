import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();

// Configura CORS para permitir solicitudes desde tu frontend
app.use(cors({
  origin: 'http://localhost:3000', // Cambia si tu frontend está en otro puerto
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Ruta de la carpeta donde se guardarán las imágenes
const uploadDir = path.join(__dirname, '../uploads');

// Asegurarnos de que la carpeta `uploads` existe, si no, la creamos
fs.promises.mkdir(uploadDir, { recursive: true })
  .then(() => {
    console.log('Carpeta uploads asegurada o creada');
  })
  .catch(err => {
    console.error('Error al crear la carpeta uploads:', err);
  });

// Configura Multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Usamos el directorio asegurado
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  }
});

const upload = multer({ storage });

// Rutas
app.use(express.json());

// Ruta para subir imágenes
app.post('/upload', upload.single('image'), (req: Request, res: Response): void => {
  // Asegurarse de que se subió un archivo
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' }); // Respuesta sin retornar
    return;
  }

  // Devuelve la URL donde se puede acceder a la imagen
  const imageUrl = `/uploads/${req.file.filename}`;

  // Respuesta exitosa con la URL de la imagen
  res.status(200).json({ message: 'Image uploaded successfully', url: imageUrl }); // Respuesta sin retornar
});

// Ruta para servir archivos estáticos (imágenes subidas)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexión a MongoDB (si es necesario)
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Inicia el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});