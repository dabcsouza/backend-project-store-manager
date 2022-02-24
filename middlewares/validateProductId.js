const productsController = require('../controllers/productsController');

const validateProductId = async (req, res, next) => {
  const { id } = req.params;
  const result = await productsController.getById(Number(id));
  return result.code ? res.status(result.code).json({ message: 'Product not found' })
  : next();
};

module.exports = validateProductId;
