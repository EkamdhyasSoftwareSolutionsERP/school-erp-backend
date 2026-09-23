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

const assignPermissionSchema = Joi.object({
  permissionId: Joi.string().uuid().required(),
});

const rolePermissionParamsSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

const rolePermissionDeleteParamsSchema = Joi.object({
  id: Joi.string().uuid().required(),
  permissionId: Joi.string().uuid().required(),
});

const replaceRolePermissionsSchema = Joi.object({
  permissionIds: Joi.array()
    .items(Joi.string().uuid().required())
    .min(0)
    .required(),
});

module.exports = {
  createRoleSchema,
  updateRoleSchema,
  updateRoleStatusSchema,
  assignPermissionSchema,
  rolePermissionParamsSchema,
  rolePermissionDeleteParamsSchema,
  replaceRolePermissionsSchema,
};