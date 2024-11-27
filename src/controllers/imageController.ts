import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import multer from 'multer';
import Image from '../models/Image';

// Crear la carpeta uploads si no existe
const uploadsDir = path.join(__dirname, '..', '..', 'uploads'); 
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir); // Crea la carpeta si no existe
}

// Configuración de multer para la subida de archivos
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, uploadsDir); // Guardamos en la carpeta uploads
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre basado en timestamp
  },
});

const upload = multer({ storage }).single('image'); // Configuración para un solo archivo

// Obtener todas las imágenes
export const getImages = async (req: Request, res: Response): Promise<void> => {
    try {
      const images = await Image.find();
      res.json(images); // Responder con todas las imágenes almacenadas
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener imágenes' });
    }
};

// Subir una nueva imagen
export const uploadImage = [
  (req: Request, res: Response): void => {
    upload(req, res, async (err: any) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Error al subir la imagen.' });
      } else if (err) {
        return res.status(500).json({ message: 'Error en el servidor al procesar la imagen.' });
      }

      const { title, description } = req.body;
      const image = req.file;

      // Validación de campos
      if (!title || !description || !image) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }

      try {
        // Guardar la imagen en la base de datos
        const newImage = new Image({
          title,
          description,
          url: `/uploads/${image.filename}`, // Ruta para acceder a la imagen
        });

        await newImage.save();
        res.status(201).json(newImage); // Responder con la imagen guardada
      } catch (err) {
        res.status(500).json({ message: 'Error al guardar la imagen' });
      }
    });
  },
];
