const productsService = require('../services/productsService');

const getAll = () => productsService.getAll();
const getById = (id) => productsService.getById(id);
const getByName = (name) => productsService.getByName(name);
const hasProductInDB = (productName) => productsService.hasProductInDB(productName);
const create = (infos) => productsService.create(infos);

module.exports = { getAll, getById, getByName, hasProductInDB, create };
