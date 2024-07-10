import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../prisma';
import { config } from '../utils/config';
import { AppError } from '../middlewares/errorMiddleware'; 
import { SignupInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '../validation/authValidation';
