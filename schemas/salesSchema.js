const Joi = require('joi');

const salesSchema = Joi.array().items(Joi.object({
  productId: Joi
    .number()
    .required()
    .min(0)
    .messages({
      'number.empty': '"productId" is required',
      'number.min': '"productId" must be greater than or equal to 1',
    }),
  quantity: Joi
    .number()
    .required()
    .min(1)
    .messages({
      'number.empty': '"quantity" is required',
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
}));

module.exports = salesSchema;
