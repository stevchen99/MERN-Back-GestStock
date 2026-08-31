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
      required: true,
      enum: ['PETIT_DEJEUNER', 'EPICERIE_SECHE', 'FRAIS', 'CONGELE', 'BOISSONS'],
      default: 'EPICERIE_SECHE'
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