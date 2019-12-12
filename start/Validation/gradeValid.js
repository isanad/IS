const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      subject: Joi.string()
        .valid(["math", "english", "chemistry"])
        .required(),
      grade: Joi.number()
        .min(0)
        .max(100)
        .required(),
      username: Joi.string()
        .min(1)
        .max(1000)
        .required()
    };
    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      subject: Joi.string().valid([
        "math",
        "chemistry",
        "english"
      ]),
      grade: Joi.number()
        .min(0)
        .max(100),
      username: Joi.string()
        .min(1)
        .max(1000)
    };
    return Joi.validate(request, updateSchema);
  }
};
