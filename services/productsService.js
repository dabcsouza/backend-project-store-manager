const productsModel = require('../models/productsModel');

const httpResponse = {
  404: 'Product not found',
};

const getAll = async () => productsModel.getAll();
const getById = async (id) => {
  const response = await productsModel.getById(id);
  return response.length === 0
    ? { code: 404, message: httpResponse[404] }
    : response;
};

const getByName = async (name) => {
  const result = await productsModel.getByName(name);
  return result;
};

const hasProductInDB = async (productName) => {
  const product = await getByName(productName);
  return !((!product || product.length === 0));
};

const create = (infos) => productsModel.create(infos);

module.exports = { getAll, getById, getByName, hasProductInDB, create };
