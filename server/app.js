const express = require('express');
const cors = require('cors');
const tripRoutes = require('./routes/tripRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Mount the routes with the correct base path
app.use('/api/trips', tripRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app; 