const Joi = require("joi");

const permissionIdParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

module.exports = {
  permissionIdParamSchema,
};