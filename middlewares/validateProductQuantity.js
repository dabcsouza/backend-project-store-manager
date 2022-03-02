const salesModel = require('../models/salesModel');

const validateProductQuantity = async (req, res, next) => {
  const sale = req.body;
  const saleStatus = sale.map(async ({ productId, quantity }) => {
    const sentense = await salesModel
      .isValidProductQuantity({ productId, quantity });
    return sentense;
  });
  const list = await Promise.all(saleStatus);
  return list.every((el) => el)
  ? next()
  : res.status(422).json({ message: 'Such amount is not permitted to sell' });
};

module.exports = validateProductQuantity;
