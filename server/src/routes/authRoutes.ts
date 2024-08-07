import express from 'express'
import { activateUserSchema, loginSchema, signupSchema } from '../validation/authValidation'
import { validateRequest } from '../middlewares/validateRequest'
import { activationUserController, signupController } from '../controllers/authController'

const router = express.Router()

router.post('/signup', validateRequest(signupSchema), signupController);
router.post('/activate-user', validateRequest(activateUserSchema), activationUserController);
// router.post('/login', validateRequest(loginSchema), loginController);

export default router;