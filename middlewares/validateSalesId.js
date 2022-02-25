const salesService = require('../services/salesService');

const validateSalesId = async (req, res, next) => {
  const { id } = req.params;
  const result = await salesService.checkSaleById(Number(id));
  if (result.code) return res.status(result.code).json({ message: result.message });
  return next();
};

module.exports = validateSalesId;
