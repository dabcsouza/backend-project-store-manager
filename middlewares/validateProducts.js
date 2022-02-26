const productsSchema = require('../schemas/productsSchema');

const httpErrorCode = {
  '"name" is required': 400,
  '"quantity" is required': 400,
  '"name" length must be at least 5 characters long': 422,
  '"quantity" must be greater than or equal to 1': 422,
};

const validateProducts = (req, res, next) => {
  try {
    productsSchema.validate(req.body);
    return next();
  } catch (e) {
    const code = e.message ? httpErrorCode[e.message] : 404;
    res.status(code).json({ message: e.message });
  }
};

module.exports = validateProducts;
