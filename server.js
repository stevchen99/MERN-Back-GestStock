import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { connectDB } from './config/db.js';

import itemRoutes from './routes/itemRoutes.js';
import freezerRoutes from './routes/freezerRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion BDD
connectDB();

// Configuration Swagger JSDoc
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gîte Stock',
      version: '1.0.0',
      description: 'API REST MERN pour la gestion de stock alimentaire d\'un gîte'
    },
    servers: [
      {
        url: '/'
      }
    ]
  },
  apis: ['./routes/*.js', './server.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @openapi
 * /:
 *   get:
 *     summary: Page d'accueil de l'API
 *     responses:
 *       200:
 *         description: Message de bienvenue
 */
app.get('/', (req, res) => {
  res.send('API Gîte Stock en cours d’exécution. Accédez à la documentation sur /api-docs');
});

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Vérification de l'état de l'API
 *     responses:
 *       200:
 *         description: Statut OK
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API Gîte Stock opérationnelle' });
});

// Routes API
app.use('/api/items', itemRoutes);
app.use('/api/freezer', freezerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Swagger Docs disponible sur /api-docs`);
});