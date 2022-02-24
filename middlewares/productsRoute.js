require('./errorMiddleware');
const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');
const validateProducts = require('./validateProducts');

const productsRoute = express.Router();

productsRoute.get('/', rescue(async (_req, res) => {
  const result = await productsController.getAll();
  res.status(200).json(result);
}));

productsRoute.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const result = await productsController.getById(Number(id));
  return result.code ? res.status(result.code).json({ message: result.message })
    : res.status(200).json(result[0]);
}));

productsRoute.post('/', validateProducts, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  if (await productsController.hasProductInDB(name)) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  const id = await productsController.create({ name, quantity });
  return res.status(201).json({ id, name, quantity });
}));

module.exports = productsRoute;
