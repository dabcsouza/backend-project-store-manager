const salesService = require('../services/salesService');

const getAll = () => salesService.getAll();
const getById = (id) => salesService.getById(id);

module.exports = { getAll, getById };
