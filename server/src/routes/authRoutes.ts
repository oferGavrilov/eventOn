import express from 'express'
import { signupSchema } from '../validation/authValidation'
import { validateRequest } from '../middlewares/validateRequest'
import { signupController } from '../controllers/authController'

const router = express.Router()
console.log('Setting up signup route');
router.post('/signup', validateRequest(signupSchema), signupController)
// router.get('/verify-email', verifyEmailController);
export default router