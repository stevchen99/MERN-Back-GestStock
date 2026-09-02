import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Le nom du produit est requis'], 
      trim: true 
    },
    category: {
      type: String,
      required: [true, 'La catégorie est requise'],
      trim: true,
      default: 'EPICERIE_SECHE'
      // Option 'enum' retirée pour autoriser les catégories dynamiques
    },
    quantity: { 
      type: Number, 
      required: true, 
      default: 0,
      min: 0 
    },
    unit: { 
      type: String, 
      default: 'unité' // kg, g, L, unité, sachet, boite
    },
    minQuantity: { 
      type: Number, 
      required: true, 
      default: 1 
    },
    location: { 
      type: String, 
      default: 'Réserve' // ex: "Étagère A1", "Frigo Réserve"
    },
    expirationDate: { 
      type: Date 
    },
    isOpened: { 
      type: Boolean, 
      default: false 
    },
    openedAt: { 
      type: Date 
    }
  },
  { timestamps: true }
);

export default mongoose.model('Item', itemSchema);