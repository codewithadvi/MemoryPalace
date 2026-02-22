import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import apiRoute from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/mindmaps', apiRoute);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
