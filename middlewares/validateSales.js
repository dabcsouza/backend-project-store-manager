const salesSchema = require('../schemas/salesSchema');

const httpErrorCode = {
  '"productId" is required': 400,
  '"quantity" is required': 400,
  '"productId" must be greater than or equal to 1': 422,
  '"quantity" must be greater than or equal to 1': 422,
};

const validateSales = async (req, res, next) => {
  try {
    await salesSchema.validateAsync(req.body);
    return next();
  } catch (e) {
    const code = e.message ? httpErrorCode[e.message] : 404;
    res.status(code).json({ message: e.message });
  }
};

module.exports = validateSales;
