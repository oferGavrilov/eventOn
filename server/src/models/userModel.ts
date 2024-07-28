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
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

// type for role
export type Role = 'EventPlanner' | 'Supplier' | 'Admin';