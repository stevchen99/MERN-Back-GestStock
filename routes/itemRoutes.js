import express from 'express';
import { 
  getItems, 
  createItem, 
  updateQuantity, 
  getShoppingList, 
  deleteItem 
} from '../controllers/itemController.js';

const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);
router.get('/shopping-list', getShoppingList);
router.patch('/:id/quantity', updateQuantity);
router.delete('/:id', deleteItem);

export default router;