import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  size: string;
  flavor: string;
  isHeartShaped: boolean;
  price: number;
  deliveryDate: Date;
  orderNumber: string;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  size: { type: String, required: true },
  flavor: { type: String, required: true },
  isHeartShaped: { type: Boolean, default: false },
  price: { type: Number, required: true },
  orderNumber: { type: String, unique: true, required: true },
  deliveryDate: { type: Date, required: true},
});

export default mongoose.model<IOrder>('Order', OrderSchema);
