require('../middlewares/errorMiddleware');
const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');
const validateProductIdSales = require('../middlewares/validateProductIdSales');
const validateProductQuantity = require('../middlewares/validateProductQuantity');
const validateSales = require('../middlewares/validateSales');
const validateSalesId = require('../middlewares/validateSalesId');

const salesRoute = express.Router();

salesRoute.get('/', rescue(salesController.getAll));

salesRoute.get('/:id', rescue(validateSalesId), rescue(salesController.getById));

salesRoute.post('/',
  rescue(validateSales),
  rescue(validateProductIdSales),
  rescue(validateProductQuantity),
  rescue(salesController.insertProductsInSale));

salesRoute.put('/:id',
  rescue(validateSalesId),
  rescue(validateSales),
  rescue(validateProductIdSales),
  rescue(validateProductQuantity),
  rescue(salesController.update));

salesRoute.delete('/:id',
rescue(validateSalesId),
rescue(salesController.deleteSale));

module.exports = salesRoute;
