import express from 'express';
import { 
  getFreezerPortions, 
  createFreezerPortion, 
  updateFreezerPortion,
  consumePortions,
  deleteFreezerPortion 
} from '../controllers/freezerController.js';

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     FreezerPortion:
 *       type: object
 *       required:
 *         - title
 *         - portionsCount
 *       properties:
 *         title:
 *           type: string
 *           example: Pavés de saumon
 *         portionsCount:
 *           type: number
 *           example: 6
 *         location:
 *           type: string
 *           example: Tiroir 1 - Poisson
 */

/**
 * @openapi
 * /api/freezer:
 *   get:
 *     summary: Obtenir toutes les portions congelées
 *     tags: [Freezer]
 *     responses:
 *       200:
 *         description: Liste récupérée
 *   post:
 *     summary: Ajouter une nouvelle portion
 *     tags: [Freezer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FreezerPortion'
 *     responses:
 *       201:
 *         description: Portion ajoutée
 */
router.get('/', getFreezerPortions);
router.post('/', createFreezerPortion);
router.put('/:id', updateFreezerPortion);
router.patch('/:id/consume', consumePortions);

/**
 * @openapi
 * /api/freezer/{id}:
 *   delete:
 *     summary: Supprimer une portion du congélateur
 *     tags: [Freezer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Portion supprimée
 */
router.delete('/:id', deleteFreezerPortion); // 2. Ajouter la route DELETE

export default router;