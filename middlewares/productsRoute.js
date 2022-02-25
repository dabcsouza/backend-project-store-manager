require('./errorMiddleware');
const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');
const validateProductId = require('./validateProductId');
const validateProducts = require('./validateProducts');

const productsRoute = express.Router();

productsRoute.get('/', rescue(productsController.getAll));

productsRoute.get('/:id', rescue(productsController.getById));

productsRoute.post('/', validateProducts, rescue(productsController.create));

productsRoute.put('/:id',
  validateProductId,
  validateProducts,
  rescue(productsController.update));

productsRoute.delete('/:id',
  validateProductId,
  rescue(productsController.exclude));

module.exports = productsRoute;
