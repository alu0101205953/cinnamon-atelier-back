import { Router } from 'express';
import { getImages, uploadImage } from '../controllers/imageController';

const router = Router();

router.get('/', getImages);
router.post('/', uploadImage);

export default router;
