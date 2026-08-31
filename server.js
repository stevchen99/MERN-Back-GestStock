import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import itemRoutes from './routes/itemRoutes.js';
import freezerRoutes from './routes/freezerRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Base de données
connectDB();

// Routes API
app.use('/api/items', itemRoutes);
app.use('/api/freezer', freezerRoutes);

// Route de santé
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API Gîte Stock opérationnelle' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});