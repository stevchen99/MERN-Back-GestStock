import FreezerPortion from '../models/FreezerPortion.js';

export const getFreezerPortions = async (req, res) => {
  try {
    const portions = await FreezerPortion.find().sort({ frozenAt: -1 });
    res.status(200).json(portions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFreezerPortion = async (req, res) => {
  try {
    const portion = await FreezerPortion.create(req.body);
    res.status(201).json(portion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateFreezerPortion = async (req, res) => {
  try {
    const portion = await FreezerPortion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!portion) {
      return res.status(404).json({ message: 'Portion non trouvée' });
    }

    res.status(200).json(portion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const consumePortions = async (req, res) => {
  try {
    const count = Number(req.body.count);
    if (!Number.isInteger(count) || count <= 0) {
      return res.status(400).json({ message: 'count doit être un entier positif' });
    }

    const portion = await FreezerPortion.findById(req.params.id);

    if (!portion) {
      return res.status(404).json({ message: 'Portion non trouvée' });
    }

    portion.portionsCount -= count;

    if (portion.portionsCount <= 0) {
      await FreezerPortion.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Stock épuisé et supprimé' });
    }

    await portion.save();
    res.status(200).json(portion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFreezerPortion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await FreezerPortion.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Portion non trouvée." });
    }

    return res.status(200).json({ message: "Portion supprimée avec succès." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la suppression.", error: error.message });
  }
};