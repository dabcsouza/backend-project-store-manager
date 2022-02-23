const productsService = require('../services/productsService');

const getAll = () => productsService.getAll();
const getById = (id) => productsService.getById(id);

module.exports = { getAll, getById };
