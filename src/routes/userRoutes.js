import { Router } from 'express';

import * as userController from '../controllers/users';
import { findUser, userValidator, userLoginValidator } from '../validators/userValidator';

const checkAuth = require('../middlewares/check-auth');
const router = Router();

/**
 * GET /api/users
 */
router.get('/', userController.fetchAll);

/**
 * GET /api/users/:id
 */
router.get('/:id', userController.fetchById);

/**
 * POST /api/users
 */
router.post('/', userValidator, userController.create);

/**
 * POST /api/users
 */
router.post('/login', userLoginValidator, userController.login);

/**
 * PUT /api/users/:id
 */
router.put('/:id', findUser, userValidator, userController.update);

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', findUser, userController.deleteUser);

export default router;
