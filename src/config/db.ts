import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/cinnamon');
    console.log('Conectado a la base de datos');
  } catch (err) {
    console.error('Error al conectar con la base de datos', err);
    process.exit(1);
  }
};

export default connectDB;
