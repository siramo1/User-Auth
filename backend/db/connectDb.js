import mongoose from'mongoose';

 export const connectDb = async () =>  {
  try {
    console.log("mongo_uri: ", process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to ${conn.connection.host}`)
  } catch (error) {
    console.log('connection failed', error.message);
    process.exit(1)
  }
};