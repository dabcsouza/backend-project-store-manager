require('../middlewares/errorMiddleware');
const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');
const validateProductId = require('../middlewares/validateProductId');
const validateProducts = require('../middlewares/validateProducts');

const productsRoute = express.Router();

productsRoute.get('/', rescue(productsController.getAll));

productsRoute.get('/:id', rescue(validateProductId), rescue(productsController.getById));

productsRoute.post('/', rescue(validateProducts), rescue(productsController.create));

productsRoute.put('/:id',
  rescue(validateProductId),
  rescue(validateProducts),
  rescue(productsController.update));

productsRoute.delete('/:id',
  rescue(validateProductId),
  rescue(productsController.exclude));

module.exports = productsRoute;
