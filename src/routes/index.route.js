// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import rankingsRouter from './rankings.route.js';
import urlsRouter from './urls.route.js';
import usersRouter from './users.route.js';

// GLOBAL CONSTANTS
const router = Router();

// ROUTES CONFIG
router.use(rankingsRouter);
router.use(urlsRouter);
router.use(usersRouter);

// VALUE EXPORTS
export default router;
