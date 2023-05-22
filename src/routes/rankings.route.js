// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import retrieveRanking from '../controllers/rankings.controller.js';

// GLOBAL CONSTANTS
const rankingsRouter = Router();

// FUNCTIONS
rankingsRouter.get('/ranking', retrieveRanking);

// VALUE EXPORTS
export default rankingsRouter;
