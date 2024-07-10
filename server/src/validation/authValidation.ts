import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    role: z.enum(['EventPlanner', 'Supplier']),
  });
  
  export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });
  
  export const forgotPasswordSchema = z.object({
    email: z.string().email(),
  });
  
  export const resetPasswordSchema = z.object({
    password: z.string().min(6),
    token: z.string().min(1),
  });
  
  export type SignupInput = z.infer<typeof signupSchema>;
  export type LoginInput = z.infer<typeof loginSchema>;
  export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
  export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
  