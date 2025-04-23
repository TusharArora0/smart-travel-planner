const Trip = require('../models/Trip');

exports.createTrip = async (req, res) => {
  try {
    const trip = new Trip({
      ...req.body,
      user: req.user._id
    });
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    
    res.json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.savePreferences = async (req, res) => {
  try {
    const trip = new Trip({
      preferences: req.body,
      status: 'draft',
      destination: req.body.destination || 'Kedarnath'
    });
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.saveFormData = async (req, res) => {
  try {
    const trip = new Trip({
      formData: req.body.formData,  // Match the client-side data structure
      status: 'draft'
    });
    
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    console.error('Save form data error:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateTripPlan = async (req, res) => {
  try {
    const tripId = req.params.id;
    const trip = await Trip.findByIdAndUpdate(
      tripId,
      {
        generatedPlan: req.body.generatedPlan,
        status: req.body.status || 'generated'
      },
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    console.error('Update trip plan error:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    console.error('Get all trips error:', error);
    res.status(500).json({ error: error.message });
  }
}; 