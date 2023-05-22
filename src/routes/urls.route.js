// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import authenticateSession from '../middlewares/authenticateSession.middleware.js';
import { retrieveUrlById, shortenUrl } from '../controllers/urls.controller.js';
import { urlSchema } from '../schemas/users.schema.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';

// GLOBAL CONSTANTS
const urlsRouter = Router();

// FUNCTIONS
urlsRouter.get('/urls/:id', retrieveUrlById);
urlsRouter.post('/urls/shorten', authenticateSession, validateSchema(urlSchema), shortenUrl);

// VALUE EXPORTS
export default urlsRouter;
