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
      const handleMessage = e.message.split('.');
      const message = handleMessage.length === 1
        ? handleMessage[0]
        : `"${handleMessage[1]}`;
      const code = e.message ? httpErrorCode[message] : 404;
      return res.status(code).json({ message });
    }
};

module.exports = validateSales;
