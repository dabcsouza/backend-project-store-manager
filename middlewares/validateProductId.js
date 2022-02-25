const productsService = require('../services/productsService');

const validateProductId = async (req, res, next) => {
  const { id } = req.params;
  const result = await productsService.getById(Number(id));
  return result.code ? res.status(result.code).json({ message: 'Product not found' })
  : next();
};

module.exports = validateProductId;
