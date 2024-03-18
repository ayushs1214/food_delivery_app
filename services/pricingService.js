// services/pricingService.js
const Pricing = require('../models/pricing');

const calculatePrice = async (zone, organization_id, total_distance, item_type) => {
  // Fetch pricing details from database based on zone and organization
  const pricing = await Pricing.findOne({
    where: {
      organization_id,
      zone,
    },
  });

  if (!pricing) {
    throw new Error('Pricing details not found');
  }

  // Calculate total price based on pricing details and item type
  let totalPrice = pricing.base_distance_in_km * pricing.fix_price;
  const additionalDistance = total_distance - pricing.base_distance_in_km;
  if (additionalDistance > 0) {
    const perKmPrice = item_type === 'perishable' ? pricing.km_price_perishable : pricing.km_price_non_perishable;
    totalPrice += additionalDistance * perKmPrice;
  }

  // Convert total price to cents to avoid decimal issues
  return Math.round(totalPrice * 100);
};

module.exports = { calculatePrice };
