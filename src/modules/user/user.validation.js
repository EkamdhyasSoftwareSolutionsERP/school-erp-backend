const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(255).required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(8).max(128).required(),
  roleIds: Joi.array().items(Joi.string().uuid()).min(1).required(),
  schoolIds: Joi.array().items(Joi.string().uuid()).min(1).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(255),
  email: Joi.string().email().trim().lowercase(),
  password: Joi.string().min(8).max(128),
  roleIds: Joi.array().items(Joi.string().uuid()).min(1),
  schoolIds: Joi.array().items(Joi.string().uuid()).min(1),
}).min(1);

const updateUserStatusSchema = Joi.object({
  isActive: Joi.boolean().required(),
});

const userIdParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema,
  userIdParamSchema,
};