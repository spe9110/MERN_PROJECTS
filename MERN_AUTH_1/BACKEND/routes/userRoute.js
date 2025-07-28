import express from 'express';
import { userAuth } from '../middlewares/userAuth.js';

import { getUserData } from '../controllers/user_controller.js';

const router = express.Router();

// @desc This route is for getting user details
// @endpoint /user
// @private
router.get('/data', userAuth, getUserData);

export default router;