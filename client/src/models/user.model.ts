export type Role = 'eventPlanner' | 'supplier'

export type SupplierCategory = 'photography' | 'videography' | 'catering' | 'decor' | 'music' | 'entertainment' | 'transport' | 'venue'

export type RegisterForm = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    phone: string
    role: Role
    category?: SupplierCategory
}

export type LoginForm = {
    email: string
    password: string
}