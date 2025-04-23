const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  preferences: {
    defaultAccommodation: {
      type: String,
      enum: ['budget', 'moderate', 'luxury'],
      default: 'moderate'
    },
    defaultTravelStyle: {
      type: String,
      enum: ['adventure', 'relaxed', 'cultural'],
      default: 'adventure'
    }
  },
  savedTrips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip'
  }]
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 