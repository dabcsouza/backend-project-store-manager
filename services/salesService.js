const salesModel = require('../models/salesModel');

const httpResponse = {
  404: 'Sale not found',
};

const getAll = async () => salesModel.getAll();

const checkSaleById = async (id) => {
  const response = await salesModel.getById(id);
  return response.length === 0
    ? { code: 404, message: httpResponse[404] }
    : {};
};

const getById = async (id) => {
  const response = await salesModel.getById(id);
  return response.length === 0
    ? { code: 404, message: httpResponse[404] }
    : response;
};

const createSale = () => salesModel.createSale();
const insertProductsInSale = async (sale) => {
  const result = await createSale();
  const id = result[0].insertId;
  sale.forEach(async ({ productId, quantity }) => {
    await salesModel.registerSales({ productId, quantity, id });
  });
  return { id, itemsSold: sale };
};

const updateProductsInSale = async (sale, id) => {
  await salesModel.deleteSalesProducts(id);
  sale.forEach(async ({ productId, quantity }) => {
    await salesModel.registerSales({ productId, quantity, id });
  });
  return { id, itemUpdated: sale };
};

module.exports = {
  checkSaleById,
  getAll,
  getById,
  createSale,
  insertProductsInSale,
  updateProductsInSale,
};
