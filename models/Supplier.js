import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Le nom du fournisseur est requis'], 
      trim: true,
      unique: true
    },
    contactName: { 
      type: String, 
      trim: true 
    },
    email: { 
      type: String, 
      trim: true 
    },
    phone: { 
      type: String, 
      trim: true 
    },
    address: { 
      type: String, 
      trim: true 
    }
  },
  { timestamps: true }
);

export default mongoose.model('Supplier', supplierSchema);