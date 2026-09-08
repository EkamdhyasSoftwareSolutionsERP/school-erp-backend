const Joi = require("joi");


const createAcademicYearSchema = Joi.object({
  school_id: Joi.string()
    .uuid()
    .required()
    .messages({
      "string.guid":
        "School ID must be a valid UUID",

      "any.required":
        "School ID is required",
    }),

  name: Joi.string()
    .trim()
    .max(20)
    .required()
    .messages({
      "string.empty":
        "Academic year name is required",

      "string.max":
        "Academic year name must not exceed 20 characters",

      "any.required":
        "Academic year name is required",
    }),

  start_date: Joi.date()
    .required()
    .messages({
      "date.base":
        "Start date must be a valid date",

      "any.required":
        "Start date is required",
    }),

  end_date: Joi.date()
    .required()
    .messages({
      "date.base":
        "End date must be a valid date",

      "any.required":
        "End date is required",
    }),

  is_current: Joi.boolean()
    .optional()
    .default(false),
});


const updateAcademicYearSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(20)
    .optional()
    .messages({
      "string.empty":
        "Academic year name cannot be empty",

      "string.max":
        "Academic year name must not exceed 20 characters",
    }),

  start_date: Joi.date()
    .optional()
    .messages({
      "date.base":
        "Start date must be a valid date",
    }),

  end_date: Joi.date()
    .optional()
    .messages({
      "date.base":
        "End date must be a valid date",
    }),

  is_current: Joi.boolean()
    .optional(),

  is_active: Joi.boolean()
    .optional(),
});


module.exports = {
  createAcademicYearSchema,
  updateAcademicYearSchema,
};