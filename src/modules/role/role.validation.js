const Joi = require("joi");

const createRoleSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow("", null)
    .optional(),
});

const updateRoleSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow("", null)
    .optional(),
}).min(1);

const updateRoleStatusSchema = Joi.object({
  isActive: Joi.boolean().required(),
});

module.exports = {
  createRoleSchema,
  updateRoleSchema,
  updateRoleStatusSchema,
};