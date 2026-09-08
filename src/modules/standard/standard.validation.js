const Joi = require("joi");


// Create Standard Validation
const createStandardSchema = Joi.object({
  school_id: Joi.string()
    .uuid()
    .required()
    .messages({
      "string.empty": "School ID is required",
      "string.uuid": "School ID must be a valid UUID",
      "any.required": "School ID is required",
    }),

  name: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required()
    .messages({
      "string.empty": "Standard name is required",
      "any.required": "Standard name is required",
      "string.max": "Standard name cannot exceed 100 characters",
    }),

  code: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .messages({
      "string.empty": "Standard code is required",
      "any.required": "Standard code is required",
      "string.max": "Standard code cannot exceed 50 characters",
    }),

  display_order: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Display order must be a number",
      "number.integer": "Display order must be an integer",
      "number.min": "Display order must be at least 1",
      "any.required": "Display order is required",
    }),
});


// Update Standard Validation
const updateStandardSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .messages({
      "string.empty": "Standard name cannot be empty",
      "string.max": "Standard name cannot exceed 100 characters",
    }),

  code: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .messages({
      "string.empty": "Standard code cannot be empty",
      "string.max": "Standard code cannot exceed 50 characters",
    }),

  display_order: Joi.number()
    .integer()
    .min(1)
    .messages({
      "number.base": "Display order must be a number",
      "number.integer": "Display order must be an integer",
      "number.min": "Display order must be at least 1",
    }),

  is_active: Joi.boolean(),
}).min(1);


module.exports = {
  createStandardSchema,
  updateStandardSchema,
};