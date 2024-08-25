import { z } from 'zod';
import { SupplierCategory } from '../models/userModel';

export const signupSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    role: z.enum(['EventPlanner', 'Supplier']),
    category: z.nativeEnum(SupplierCategory).optional(),
  }).refine((data) => {
    if (data.role === 'Supplier') {
      return !!data.category;
    }
    return true;
  }, {
    message: 'Supplier category is required',
    path: ['supplierCategory'],
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

export const activateUserSchema = z.object({
  body: z.object({
    activationToken: z.string().min(1, "Invalid activation token"),
    activationCode: z.string().min(1, "Invalid activation code"),
  }),
});

export const resendVerificationEmailSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
  }),
});

export type SignupInput = z.infer<typeof signupSchema>['body'];
export type ActivateUserInput = z.infer<typeof activateUserSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type ResendVerificationEmailInput = z.infer<typeof resendVerificationEmailSchema>['body'];
