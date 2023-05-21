// PACKAGE IMPORTS
import { Router } from 'express';

// VALUE IMPORTS
import usersRouter from './users.route.js';

// GLOBAL CONSTANTS
const router = Router();

// ROUTES CONFIG
router.use(usersRouter);

// VALUE EXPORTS
export default router;
