import express from 'express'
import { activateUserSchema, loginSchema, signupSchema } from '../validation/authValidation'
import { validateRequest } from '../middlewares/validateRequest'
import { activationUserController, login2FAController, loginController, signupController } from '../controllers/authController'

const router = express.Router()

router.post('/signup', validateRequest(signupSchema), signupController);
router.post('/activate-user', validateRequest(activateUserSchema), activationUserController);
router.post('/login', validateRequest(loginSchema), loginController);
router.post('/login-2fa', login2FAController);

export default router;
