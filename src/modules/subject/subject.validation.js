const Joi = require("joi");


// Create Subject Validation
const createSubjectSchema = Joi.object({
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
      "string.empty": "Subject name is required",
      "any.required": "Subject name is required",
      "string.max": "Subject name cannot exceed 100 characters",
    }),

  code: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .messages({
      "string.empty": "Subject code is required",
      "any.required": "Subject code is required",
      "string.max": "Subject code cannot exceed 50 characters",
    }),

  description: Joi.string()
    .trim()
    .allow("")
    .optional()
    .messages({
      "string.base": "Description must be a string",
    }),
});


// Update Subject Validation
const updateSubjectSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .messages({
      "string.empty": "Subject name cannot be empty",
      "string.max": "Subject name cannot exceed 100 characters",
    }),

  code: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .messages({
      "string.empty": "Subject code cannot be empty",
      "string.max": "Subject code cannot exceed 50 characters",
    }),

  description: Joi.string()
    .trim()
    .allow("")
    .messages({
      "string.base": "Description must be a string",
    }),

  is_active: Joi.boolean(),

}).min(1);


module.exports = {
  createSubjectSchema,
  updateSubjectSchema,
};