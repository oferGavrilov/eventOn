export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: Role;
    category?: SupplierCategory;
    createdAt: Date;
    updatedAt: Date;
}

// type for role
export type Role = 'EventPlanner' | 'Supplier' | 'Admin';

export enum SupplierCategory {
    EVENT_PLACES = "EVENT_PLACES",
    MUSIC_DJS = "MUSIC_DJS",
    MAKEUP = "MAKEUP",
    PHOTOGRAPHY = "PHOTOGRAPHY",
    ATTRACTIONS = "ATTRACTIONS",
    DESIGN = "DESIGN",
    CATERING_DRINKS = "CATERING_DRINKS"
}
