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
    },
    supplier: {
      type: String, // Stocke le nom du fournisseur (ex: "Metro", "Promocash")
      default: ''
    },
    quantity: { 
      type: Number, 
      required: true, 
      default: 0,
      min: 0 
    },
    unit: { 
      type: String, 
      default: 'unité'
    },
    minQuantity: { 
      type: Number, 
      required: true, 
      default: 1 
    }
  },
  { timestamps: true }
);

export default mongoose.model('Item', itemSchema);