import express from "express";
import { getImages, uploadImage, } from "../controllers/imageController";

const router = express.Router();

// Ruta protegida para subir imágenes
router.post("/", uploadImage);

// Ruta para obtener todas las imágenes
router.get("/", getImages);

export default router;
