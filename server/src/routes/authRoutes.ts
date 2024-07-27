import express from 'express'
import { signupSchema } from '../validation/authValidation'
import { validateRequest } from '../middlewares/validateRequest'
import { signupController } from '../controllers/authController'

const router = express.Router()
router.post('/signup', validateRequest(signupSchema), signupController)
// router.get('/verify-email', verifyEmailController);
export default router