import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import Image from '../models/Image';

// Ruta para subir imágenes
export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    // Asegúrate de que se haya enviado un archivo
    if (!file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    // Generamos la URL de la imagen (o el nombre de la imagen)
    const fileUrl = `/uploads/${file.filename}`;

    // Guardar la imagen en la base de datos
    const newImage = new Image({
      url: fileUrl,
      title,
      description
    });

    await newImage.save();

    // Responder correctamente sin devolver el objeto Response
    res.status(201).json({
      message: 'Image uploaded successfully',
      image: newImage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
