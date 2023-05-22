// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import authenticateSession from '../middlewares/authenticateSession.middleware.js';
import { signUp, signIn, shortenUrl } from '../controllers/users.controller.js';
import { signUpSchema, signInSchema, urlSchema } from '../schemas/users.schema.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';

// GLOBAL CONSTANTS
const usersRouter = Router();

// FUNCTIONS
usersRouter.post('/signup', validateSchema(signUpSchema), signUp);
usersRouter.post('/signin', validateSchema(signInSchema), signIn);
usersRouter.post('/urls/shorten', authenticateSession, validateSchema(urlSchema), shortenUrl);

// VALUE EXPORTS
export default usersRouter;
