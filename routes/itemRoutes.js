import express from 'express';
import { 
  getItems, 
  createItem, 
  updateQuantity, 
  getShoppingList, 
  deleteItem 
} from '../controllers/itemController.js';

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           example: Café en grain
 *         category:
 *           type: string
 *           enum: [PETIT_DEJEUNER, EPICERIE_SECHE, FRAIS, CONGELE, BOISSONS]
 *           example: PETIT_DEJEUNER
 *         quantity:
 *           type: number
 *           example: 3
 *         unit:
 *           type: string
 *           example: sachet 1kg
 *         minQuantity:
 *           type: number
 *           example: 2
 *         location:
 *           type: string
 *           example: Réserve A1
 */

/**
 * @openapi
 * /api/items:
 *   get:
 *     summary: Obtenir tous les produits
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: lowStock
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Liste des produits récupérée
 *   post:
 *     summary: Créer un nouveau produit
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Produit créé
 */
router.get('/', getItems);
router.post('/', createItem);

/**
 * @openapi
 * /api/items/shopping-list:
 *   get:
 *     summary: Obtenir la liste de courses basée sur les stocks faibles
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Liste de courses générée
 */
router.get('/shopping-list', getShoppingList);

/**
 * @openapi
 * /api/items/{id}/quantity:
 *   patch:
 *     summary: Modifier la quantité d'un produit (+1 / -1)
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               delta:
 *                 type: number
 *                 example: -1
 *     responses:
 *       200:
 *         description: Quantité mise à jour
 */
router.patch('/:id/quantity', updateQuantity);

/**
 * @openapi
 * /api/items/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produit supprimé
 */
router.delete('/:id', deleteItem);

export default router;