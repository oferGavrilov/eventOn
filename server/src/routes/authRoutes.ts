import express from 'express'
import { signupSchema, verifyEmailSchema } from '../validation/authValidation'
import { validateRequest } from '../middlewares/validateRequest'
import { signupController, verifyEmailController } from '../controllers/authController'

const router = express.Router()
router.post('/signup', validateRequest(signupSchema), signupController)
router.get('/verify-email',validateRequest(verifyEmailSchema), verifyEmailController);
export default router