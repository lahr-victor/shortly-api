// PACKAGE IMPORTS
import joi from 'joi';

// GLOBAL CONSTANTS
const signUpSchema = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
  confirmPassword: joi.string().min(3).required(),
});

// VALUE EXPORTS
export default signUpSchema;
