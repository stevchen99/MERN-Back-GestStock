import express from 'express';
import { 
  getFreezerPortions, 
  createFreezerPortion, 
  consumePortions 
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

/**
 * @openapi
 * /api/freezer/{id}/consume:
 *   patch:
 *     summary: Consommer des portions
 *     tags: [Freezer]
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
 *               count:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Portions décrémentées ou supprimées si 0
 */
router.patch('/:id/consume', consumePortions);

export default router;