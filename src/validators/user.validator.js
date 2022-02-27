import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(4).required(),
    lastName: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};



export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().min(4).required(),
    Description: Joi.string().min(4).required(),
    isArchived: Joi.boolean(true),
    isDeleted: Joi.boolean(),
    Color: Joi.string(),
    userId: Joi.string().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};