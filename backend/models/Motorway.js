import mongoose from 'mongoose';

const motorwaySchema = new mongoose.Schema({
  key: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  value: { 
    type: String, 
    required: true 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

const Motorway = mongoose.model('Motorway', motorwaySchema);

export default Motorway;
