const Joi = require("joi");


// Create Division Validation
const createDivisionSchema = Joi.object({
  standard_id: Joi.string()
    .uuid()
    .required()
    .messages({
      "string.empty": "Standard ID is required",
      "string.uuid": "Standard ID must be a valid UUID",
      "any.required": "Standard ID is required",
    }),

  academic_year_id: Joi.string()
    .uuid()
    .required()
    .messages({
      "string.empty": "Academic Year ID is required",
      "string.uuid": "Academic Year ID must be a valid UUID",
      "any.required": "Academic Year ID is required",
    }),

  name: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .messages({
      "string.empty": "Division name is required",
      "any.required": "Division name is required",
      "string.max": "Division name cannot exceed 50 characters",
    }),

  code: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .messages({
      "string.empty": "Division code is required",
      "any.required": "Division code is required",
      "string.max": "Division code cannot exceed 50 characters",
    }),

  capacity: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages({
      "number.base": "Capacity must be a number",
      "number.integer": "Capacity must be an integer",
      "number.min": "Capacity must be at least 1",
    }),
});


// Update Division Validation
const updateDivisionSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .messages({
      "string.empty": "Division name cannot be empty",
      "string.max": "Division name cannot exceed 50 characters",
    }),

  code: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .messages({
      "string.empty": "Division code cannot be empty",
      "string.max": "Division code cannot exceed 50 characters",
    }),

  capacity: Joi.number()
    .integer()
    .min(1)
    .messages({
      "number.base": "Capacity must be a number",
      "number.integer": "Capacity must be an integer",
      "number.min": "Capacity must be at least 1",
    }),

  is_active: Joi.boolean(),
}).min(1);


module.exports = {
  createDivisionSchema,
  updateDivisionSchema,
};