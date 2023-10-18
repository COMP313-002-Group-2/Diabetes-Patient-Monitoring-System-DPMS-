import mongoose from 'mongoose';

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)

};

export default connectDB;
