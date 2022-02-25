const salesService = require('../services/salesService');

const getAll = () => salesService.getAll();
const getById = (id) => salesService.getById(id);
const insertProductsInSale = async (req, res) => {
  const sale = req.body;
  const result = await salesService.insertProductsInSale(sale);
  return res.status(201).json(result);
};

module.exports = { getAll, getById, insertProductsInSale };
