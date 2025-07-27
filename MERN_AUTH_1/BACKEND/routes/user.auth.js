import express from 'express';
import { createUser } from '../controllers/user.auth.js';

const router = express.Router();

// @desc This route is for create a user 
// @endpoint /create
// @public 
router.post('/create', createUser);

export default router;