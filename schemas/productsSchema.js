const Joi = require('joi');

const productsSchema = Joi.object({
  name: Joi
    .string()
    .required()
    .min(5)
    .messages({
      'string.min': '"name" length must be at least 5 characters long',
    }),
  quantity: Joi
    .number()
    .required()
    .min(1)
    .messages({
      'number.empty': '"quantity" is required',
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
});

module.exports = productsSchema;
