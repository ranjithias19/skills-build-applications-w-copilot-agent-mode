import mongoose from 'mongoose';

// Use MongoDB with database name octofit_db
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDB() {
  console.log('Connecting with mongoose to', MONGODB_URI);
  return mongoose.connect(MONGODB_URI);
}

export default {
  MONGODB_URI,
  connectDB,
};
