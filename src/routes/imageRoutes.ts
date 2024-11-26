import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { uploadImage } from '../controllers/imageController';

const router = Router();

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Asigna un nombre único basado en la fecha
  }
});

const upload = multer({ storage });

// Ruta para subir la imagen
router.post('/upload', upload.single('image'), uploadImage);

export default router;
