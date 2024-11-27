import Order from "../models/Order";
import { Request, Response } from 'express';

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
    try {
      const orders = await Order.find(); 
      res.status(200).json({ orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Error al obtener los pedidos." });
    }
  };
  