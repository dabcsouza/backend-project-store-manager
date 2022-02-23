const salesModel = require('../models/salesModel');

const httpResponse = {
  404: 'Sale not found',
};

const getAll = async () => salesModel.getAll();
const getById = async (id) => {
  const response = await salesModel.getById(id);
  return response.length === 0
    ? { code: 404, message: httpResponse[404] }
    : response;
};

module.exports = { getAll, getById };
