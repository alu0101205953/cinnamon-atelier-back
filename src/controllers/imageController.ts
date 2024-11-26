import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import multer from 'multer';
import Image from '../models/Image';

// Crear la carpeta uploads si no existe
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);  // Crea la carpeta si no existe
}

// Configuración de multer para la subida de archivos
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/'); // Esta es la ruta donde se guardará el archivo
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + '-' + file.originalname); // El nombre de archivo será el timestamp seguido del nombre original
  },
});

const upload = multer({ storage }).single('image'); // Usamos un solo archivo con el campo 'image'

// Obtener todas las imágenes
export const getImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const images = await Image.find();
    res.json(images); // Enviar las imágenes como respuesta
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener imágenes' });
  }
};

// Subir una nueva imagen
export const uploadImage = (req: Request, res: Response): void => {
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
      // Guardamos la ruta de la imagen en la base de datos
      const newImage = new Image({
        title,
        description,
        url: `/uploads/${image.filename}`, // Almacenamos la ruta de la imagen
      });

      await newImage.save(); // Guardamos la imagen en la base de datos
      res.status(201).json(newImage); // Respondemos con la imagen guardada
    } catch (err) {
      res.status(500).json({ message: 'Error al guardar la imagen' });
    }
  });
};
