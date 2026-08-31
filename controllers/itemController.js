import Item from '../models/Item.js';

// @desc    Obtenir tous les produits (avec filtres optionnels)
// @route   GET /api/items
export const getItems = async (req, res) => {
  try {
    const { category, lowStock } = req.query;
    let query = {};

    if (category) query.category = category;
    
    let items = await Item.find(query).sort({ expirationDate: 1 });

    if (lowStock === 'true') {
      items = items.filter(item => item.quantity <= item.minQuantity);
    }

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Créer un nouveau produit
// @route   POST /api/items
export const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Ajuster rapidement la quantité (+1 / -1)
// @route   PATCH /api/items/:id/quantity
export const updateQuantity = async (req, res) => {
  try {
    const { delta } = req.body; // ex: +1 ou -1
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    item.quantity = Math.max(0, item.quantity + delta);
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Générer la liste de courses (produits <= minQuantity)
// @route   GET /api/items/shopping-list
export const getShoppingList = async (req, res) => {
  try {
    const itemsToBuy = await Item.find({
      $expr: { $lte: ['$quantity', '$minQuantity'] }
    });
    
    const shoppingList = itemsToBuy.map(item => ({
      _id: item._id,
      name: item.name,
      category: item.category,
      currentQuantity: item.quantity,
      minQuantity: item.minQuantity,
      toBuyQuantity: item.minQuantity - item.quantity + 1,
      unit: item.unit
    }));

    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Supprimer un produit
// @route   DELETE /api/items/:id
export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Produit supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};