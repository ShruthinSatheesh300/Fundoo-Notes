import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes'
export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(4).required().error( Error('Enter a appropriate first name')),
    lastName: Joi.string().min(4).required().error( Error('Enter a appropriate last name')),
    email: Joi.string().email().required().error( Error('Enter a appropriate Email')),
    password: Joi.string().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
    code: HttpStatus.BAD_REQUEST,
    message: `Enter valid deatils : ${error}`})
  } else {
    // req.validatedBody = value;
    next();
  }
};



export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().min(4).required(),
    Description: Joi.string().min(4).required(),
    Color: Joi.string(),
    isArchived: Joi.boolean(),
    isDeleted: Joi.boolean(),
    
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};