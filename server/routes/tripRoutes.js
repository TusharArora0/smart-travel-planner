const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.post('/', tripController.createTrip);
router.get('/', tripController.getUserTrips);
router.get('/:id', tripController.getTripById);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);
router.post('/preferences', tripController.savePreferences);
router.put('/:id/plan', tripController.updateTripPlan);
router.get('/user/:userId', tripController.getUserTrips);
router.post('/form', tripController.saveFormData);
router.get('/', tripController.getAllTrips);

module.exports = router; 