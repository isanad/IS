const Joi = require("joi");

/*(module.exports = {
  loginValidation: request => {
    const LoginSchema = {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    };
    return Joi.validate(request, LoginSchema);
  }
})*/
  (module.exports = {
    createValidation: request => {
      const createSchema = {
        name: Joi.string()
          .min(3)
          .max(500)
          .required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .alphanum()
          .required(),
        age: Joi.number()
          .min(1)
          .max(100)
          .required(),
        username: Joi.string()
          .min(3)
          .max(500)
          .required(),
        phoneNumber: Joi.string()
          .min(1)
          .max(12)
          .required(),
        userType: Joi.string()
          .valid(["student", "instructor", "teacher assistant"])
          .required()
      };

      return Joi.validate(request, createSchema);
    },

    updatValidation: request => {
      const updateSchema = {
        name: Joi.string()
          .min(3)
          .max(500)
          .required(),
        email: Joi.string()
          .min(10)
          .max(500)
          .required(),
        password: Joi.string()
          .min(8)
          .max(80)
          .required(),
        age: Joi.number()
          .min(1)
          .max(300)
          .required(),
        username: Joi.string()
          .min(3)
          .max(500)
          .required(),
        phoneNumber: Joi.string()
          .min(1)
          .max(12)
          .required(),
        userType: Joi.string()
          .min(3)
          .max(500)
          .required()
      };

      return Joi.validate(request, updateSchema);
    }
  })
