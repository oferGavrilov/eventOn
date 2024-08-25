import { IUser, Role } from "../../models/userModel";

declare global {
    namespace Express {
        interface Request {
            userId: string;
            userRole: Role;
        }
    }
}