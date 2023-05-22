// PACKAGE IMPORTS
import joi from 'joi';

// GLOBAL CONSTANTS
export const signUpSchema = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
  confirmPassword: joi.string().min(3).required(),
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
});

export const urlSchema = joi.object({
  url: joi.string().uri(),
});
