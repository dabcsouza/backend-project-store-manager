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

module.exports = { getAll, getById };
