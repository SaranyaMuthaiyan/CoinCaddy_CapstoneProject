import express  from 'express'
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/UserRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes)
app.use('/api/finance', financeRoutes);



mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(port, () => console.log('Server running on port 3000'));
});