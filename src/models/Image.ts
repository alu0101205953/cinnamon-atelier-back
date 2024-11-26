import mongoose, { Schema, Document } from 'mongoose';

interface IImage extends Document {
  title: string;
  description: string;
  url: string;
}

const imageSchema = new Schema<IImage>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
});

const Image = mongoose.model<IImage>('Image', imageSchema);
export default Image;
