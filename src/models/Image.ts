import mongoose from 'mongoose';

interface IImage extends mongoose.Document {
  url: string;
  title: string;
  description: string;
}

const imageSchema = new mongoose.Schema<IImage>(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IImage>('Image', imageSchema);
