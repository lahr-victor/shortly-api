// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import { signUp, signIn } from '../controllers/users.controller.js';
import { signUpSchema, signInSchema } from '../schemas/users.schema.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';

// GLOBAL CONSTANTS
const usersRouter = Router();

// FUNCTIONS
usersRouter.post('/signup', validateSchema(signUpSchema), signUp);
usersRouter.post('/signin', validateSchema(signInSchema), signIn);

// VALUE EXPORTS
export default usersRouter;
