const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const result = await salesService.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getById(Number(id));
  return res.status(200).json(result);
};

const insertProductsInSale = async (req, res) => {
  const sale = req.body;
  const result = await salesService.insertProductsInSale(sale);
  return res.status(201).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const salesUpdate = req.body;
  const result = await salesService.updateProductsInSale(salesUpdate, Number(id));
  return res.status(200).json(result);
};

module.exports = { getAll, getById, insertProductsInSale, update };
