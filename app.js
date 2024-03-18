// app.js
const express = require('express');
const bodyParser = require('body-parser');
const pricingRoutes = require('./routes/pricingRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/pricing', pricingRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
