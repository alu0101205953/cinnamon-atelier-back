import express, { Request, Response } from 'express';
import Order, { IOrder } from '../models/Order';

const router = express.Router();

// Crear un nuevo pedido
router.post('/api/orders', async (req: Request, res: Response) => {
  try {
    const { size, flavor, isHeartShaped, price, deliveryDate, phoneNumber, notes, imageUrl } = req.body;

    // Generar un número único de pedido
    const orderNumber = `ORDER-${Date.now()}`;

    const newOrder = new Order({
      size,
      flavor,
      isHeartShaped,
      price,
      orderNumber,
      deliveryDate,
      phoneNumber,
      notes: notes || '',
      imageUrl: imageUrl || ''
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Pedido guardado exitosamente', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el pedido', error });
  }
});

// Obtener todos los pedidos
router.get('/api/orders', async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error });
  }
});

export default router;
