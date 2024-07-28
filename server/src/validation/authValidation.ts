import { z } from 'zod';

export const signupSchema = z.object({
  body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      role: z.enum(['EventPlanner', 'Supplier']),
    }),
  });

  export const verifyEmailSchema = z.object({
    query: z.object({
      token: z.string().min(1),
    }),
  });

  export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>['query'];
  export type SignupInput = z.infer<typeof signupSchema>['body'];
  // export const loginSchema = z.object({
  //   email: z.string().email(),
  //   password: z.string().min(1),
  // });
  
  // export const forgotPasswordSchema = z.object({
  //   email: z.string().email(),
  // });
  
  // export const resetPasswordSchema = z.object({
  //   password: z.string().min(6),
  //   token: z.string().min(1),
  // });
  
  // export type LoginInput = z.infer<typeof loginSchema>;
  // export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
  // export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
  