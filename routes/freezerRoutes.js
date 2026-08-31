import express from 'express';
import { 
  getFreezerPortions, 
  createFreezerPortion, 
  consumePortions 
} from '../controllers/freezerController.js';

const router = express.Router();

router.get('/', getFreezerPortions);
router.post('/', createFreezerPortion);
router.patch('/:id/consume', consumePortions);

export default router;