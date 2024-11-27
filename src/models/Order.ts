import mongoose, { Schema, Document } from 'mongoose';

// Define la interfaz para el modelo de la orden
export interface IOrder extends Document {
  size: string;
  flavor: string;
  isHeartShaped: boolean;
  price: number;
  deliveryDate: Date;
  orderNumber: string;
  createdAt: Date;
  phoneNumber: string; // Nuevo campo para el teléfono
  notes?: string; // Campo de anotaciones opcionales
  imageUrl?: string; //Campo para almacenar las URLs de las imágenes subidas
}

// Definición del esquema de la orden
const OrderSchema: Schema = new Schema(
  {
    size: { type: String, required: true },
    flavor: { type: String, required: true },
    isHeartShaped: { type: Boolean, default: false },
    price: { type: Number, required: true },
    orderNumber: { type: String, unique: true, required: true },
    deliveryDate: { type: Date, required: true },
    phoneNumber: { type: String, required: true }, // Teléfono obligatorio
    notes: { type: String, default: '' }, // Anotaciones opcionales
    imageUrl: { type: String, default: '' }, // Array de URLs para las imágenes subidas
  },
  { timestamps: true } // Habilita automáticamente createdAt y updatedAt
);

// Exporta el modelo
export default mongoose.model<IOrder>('Order', OrderSchema);
