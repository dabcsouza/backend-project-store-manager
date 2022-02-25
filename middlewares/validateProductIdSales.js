const productsController = require('../controllers/productsController');

const validateProductIdSales = async (req, res, next) => {
  const listId = req.body.map((product) => Number(product.productId));
  const responseId = listId
    .map((id) => productsController.getById(id));
  const responsePromises = await Promise.all(responseId);
  const isInvalidId = responsePromises.map((el) => el.code);
  return isInvalidId.some((el) => el)
    ? res.status(404).json({ message: 'Product not found' }) : next();
};

module.exports = validateProductIdSales;
