const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  formData: {
    budget: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    accommodation: {
      type: String,
      enum: ['budget', 'moderate', 'luxury'],
      default: 'moderate'
    },
    travelStyle: {
      type: String,
      enum: ['adventure', 'relaxed', 'cultural'],
      default: 'adventure'
    }
  },
  generatedPlan: {
    itinerary: [{
      day: Number,
      date: String,
      activities: [{
        name: String,
        time: String,
        duration: String,
        description: String,
        cost: Number
      }],
      accommodation: {
        name: String,
        location: String,
        type: String,
        cost: Number,
        includes: [String],
        coordinates: {
          lat: Number,
          lng: Number
        }
      },
      meals: [{
        type: String,
        venue: String,
        cuisine: String,
        cost: Number
      }],
      transportation: {
        mode: String,
        from: String,
        to: String,
        duration: String,
        cost: Number
      },
      dailyTotal: Number
    }],
    totalCost: Number,
    recommendations: {
      whatToPack: [String],
      bestTimeToVisit: String,
      tips: [String]
    }
  },
  status: {
    type: String,
    enum: ['draft', 'generated', 'completed'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trip', tripSchema);