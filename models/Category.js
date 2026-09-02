import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Le nom de la catégorie est requis'], 
      trim: true,
      unique: true
    },
    type: { 
      type: String, 
      enum: ['stock', 'freezer', 'both'], 
      default: 'both' 
    }
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);