// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import signUp from '../controllers/users.controller.js';
import signUpSchema from '../schemas/users.schema.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';

// GLOBAL CONSTANTS
const usersRouter = Router();

// FUNCTIONS
usersRouter.post('/signup', validateSchema(signUpSchema), signUp);

// VALUE EXPORTS
export default usersRouter;