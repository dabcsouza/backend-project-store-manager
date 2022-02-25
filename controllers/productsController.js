const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const result = await productsService.getAll();
  res.status(200).json(result);
};
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getById(Number(id));
  return result.code ? res.status(result.code).json({ message: result.message })
    : res.status(200).json(result[0]);
};

const getByName = (name) => productsService.getByName(name);
const hasProductInDB = (productName) => productsService.hasProductInDB(productName);

const create = async (req, res) => {
  const { name, quantity } = req.body;
  if (await hasProductInDB(name)) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  const id = await productsService.create({ name, quantity });
  return res.status(201).json({ id, name, quantity });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await productsService.update({ name, quantity, id });
  res.status(200).json({ id, name, quantity });
};

const exclude = async (req, res) => {
  const { id } = req.params;
  await productsService.exclude(Number(id));
  res.status(204).json();
};

module.exports = {
  getAll,
  getById,
  getByName,
  hasProductInDB,
  create,
  update,
  exclude,
};
