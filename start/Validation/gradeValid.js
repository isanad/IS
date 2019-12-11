const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      subject: Joi.string()
        .min(3)
        .max(500)
        .required(),
      grade: Joi.number()
        .min(0)
        .max(100)
        .required(),
      user_id: Joi.number()
        .min(1)
        .max(1000)
        .required()
    };
    return Joi.validate(request, createSchema);
    }
}

module.exports = {
    updateValidation: request => {
      const updateSchema = {
        subject: Joi.string()
          .min(3)
          .max(500)
          .required(),
        grade: Joi.number()
          .min(0)
          .max(100)
          .required(),
        user_id: Joi.number()
          .min(1)
          .max(1000)
          .required()
      };
      return Joi.validate(request, updateSchema);
      }
  }