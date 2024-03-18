// controllers/pricingController.js
const pricingService = require('../services/pricingService');

const calculatePrice = async (req, res) => {
  try {
    // Extract required data from request
    const { zone, organization_id, total_distance, item_type } = req.body;

    // Call pricing service to calculate price
    const totalPrice = await pricingService.calculatePrice(zone, organization_id, total_distance, item_type);

    // Send response
    res.json({ total_price: totalPrice });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

module.exports = { calculatePrice };
