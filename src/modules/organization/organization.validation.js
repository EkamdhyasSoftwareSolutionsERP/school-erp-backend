const Joi = require("joi");

const createOrganizationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(255)
    .required()
    .messages({
      "string.empty": "Organization name is required",
      "any.required": "Organization name is required",
      "string.max":
        "Organization name must not exceed 255 characters",
    }),

  code: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      "string.empty": "Organization code is required",
      "any.required": "Organization code is required",
      "string.max":
        "Organization code must not exceed 100 characters",
    }),
});

const updateOrganizationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(255)
    .messages({
      "string.empty": "Organization name cannot be empty",
      "string.max":
        "Organization name must not exceed 255 characters",
    }),

  code: Joi.string()
    .trim()
    .max(100)
    .messages({
      "string.empty": "Organization code cannot be empty",
      "string.max":
        "Organization code must not exceed 100 characters",
    }),

  is_active: Joi.boolean().messages({
    "boolean.base": "is_active must be a boolean value",
  }),
});

module.exports = {
  createOrganizationSchema,
  updateOrganizationSchema,
};