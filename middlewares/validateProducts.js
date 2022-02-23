const productsSchema = require('../schemas/productsSchema');

const httpErrorCode = {
  '"name" is required': 400,
  '"quantity" is required': 400,
  '"name" length must be at least 5 characters long': 422,
  '"quantity" must be greater than or equal to 1': 422,
};

const validateProducts = async (req, res, next) => {
  try {
    await productsSchema.validateAsync(req.body);
    next();
  } catch (e) {
    res.status(httpErrorCode[e.message]).json({ message: e.message });
  }
};

module.exports = validateProducts;
