import mongoose from 'mongoose';

const freezerPortionSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, 'Le titre du plat/produit est requis'],
      trim: true 
    },
    portionsCount: { 
      type: Number, 
      required: true, 
      min: 1 
    },
    frozenAt: { 
      type: Date, 
      default: Date.now 
    },
    expirationDate: { 
      type: Date 
    },
    location: { 
      type: String, 
      default: 'Tiroir 1' 
    }
  },
  { timestamps: true }
);

export default mongoose.model('FreezerPortion', freezerPortionSchema);