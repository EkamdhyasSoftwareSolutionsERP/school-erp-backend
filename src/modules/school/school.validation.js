const Joi = require("joi");

const createSchoolSchema = Joi.object({
  organization_id: Joi.string()
    .uuid()
    .required()
    .messages({
      "string.guid": "Organization ID must be a valid UUID",
      "any.required": "Organization ID is required",
    }),

  name: Joi.string()
    .trim()
    .max(255)
    .required()
    .messages({
      "string.empty": "School name is required",
      "string.max":
        "School name must not exceed 255 characters",
      "any.required": "School name is required",
    }),

  code: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      "string.empty": "School code is required",
      "string.max":
        "School code must not exceed 100 characters",
      "any.required": "School code is required",
    }),

  email: Joi.string()
    .email()
    .max(255)
    .optional()
    .allow("")
    .messages({
      "string.email":
        "Please provide a valid email address",
    }),

  phone: Joi.string()
    .trim()
    .max(20)
    .optional()
    .allow(""),

  address: Joi.string()
    .trim()
    .optional()
    .allow(""),

  city: Joi.string()
    .trim()
    .max(100)
    .optional()
    .allow(""),

  state: Joi.string()
    .trim()
    .max(100)
    .optional()
    .allow(""),

  pincode: Joi.string()
    .trim()
    .max(10)
    .optional()
    .allow(""),
});


const updateSchoolSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(255)
    .optional()
    .messages({
      "string.empty": "School name cannot be empty",
      "string.max":
        "School name must not exceed 255 characters",
    }),

  code: Joi.string()
    .trim()
    .max(100)
    .optional()
    .messages({
      "string.empty": "School code cannot be empty",
      "string.max":
        "School code must not exceed 100 characters",
    }),

  email: Joi.string()
    .email()
    .max(255)
    .optional()
    .allow("")
    .messages({
      "string.email":
        "Please provide a valid email address",
    }),

  phone: Joi.string()
    .trim()
    .max(20)
    .optional()
    .allow(""),

  address: Joi.string()
    .trim()
    .optional()
    .allow(""),

  city: Joi.string()
    .trim()
    .max(100)
    .optional()
    .allow(""),

  state: Joi.string()
    .trim()
    .max(100)
    .optional()
    .allow(""),

  pincode: Joi.string()
    .trim()
    .max(10)
    .optional()
    .allow(""),

  is_active: Joi.boolean()
    .optional(),
});


module.exports = {
  createSchoolSchema,
  updateSchoolSchema,
};