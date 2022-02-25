require('./errorMiddleware');
const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');
const validateProductIdSales = require('./validateProductIdSales');
const validateSales = require('./validateSales');
const validateSalesId = require('./validateSalesId');

const salesRoute = express.Router();

salesRoute.get('/', rescue(salesController.getAll));

salesRoute.get('/:id', validateSalesId, rescue(salesController.getById));

salesRoute.post('/',
  validateSales,
  validateProductIdSales,
  rescue(salesController.insertProductsInSale));

salesRoute.put('/:id',
  validateSalesId,
  validateSales,
  validateProductIdSales,
  rescue(salesController.update));

module.exports = salesRoute;
