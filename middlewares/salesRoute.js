require('./errorMiddleware');
const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');
const validateSales = require('./validateSales');

const salesRoute = express.Router();

salesRoute.get('/', rescue(async (_req, res) => {
  const result = await salesController.getAll();
  res.status(200).json(result);
}));

salesRoute.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const result = await salesController.getById(Number(id));
  return result.code ? res.status(result.code).json({ message: result.message })
    : res.status(200).json(result);
}));

salesRoute.post('/', validateSales, async (req, res) => {
  res.end();
});

module.exports = salesRoute;
