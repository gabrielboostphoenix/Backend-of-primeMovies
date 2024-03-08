// Importing Area
import { Request } from 'express';

// That's a signup request's type
interface signUp extends Request {
    userName: string,
    userEmail: string,
    userPassword: string
}

// Exporting Area
export type { signUp };