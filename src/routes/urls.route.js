// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import authenticateSession from '../middlewares/authenticateSession.middleware.js';
import shortenUrl from '../controllers/urls.controller.js';
import { urlSchema } from '../schemas/users.schema.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';

// GLOBAL CONSTANTS
const urlsRouter = Router();

// FUNCTIONS
urlsRouter.post('/urls/shorten', authenticateSession, validateSchema(urlSchema), shortenUrl);

// VALUE EXPORTS
export default urlsRouter;
