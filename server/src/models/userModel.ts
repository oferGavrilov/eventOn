export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isVerified: boolean;
    verificationToken: string | null;
    verificationTokenExpiresAt: Date | null;
    forgotPasswordToken: string | null;
    forgotPasswordExpiresAt: Date | null;
    role: 'EventPlanner' | 'Supplier' | 'Admin';
    createdAt: Date;
    updatedAt: Date;
}
