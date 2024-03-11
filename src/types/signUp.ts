// Importing Area
import { Request } from 'express';
import { authorized } from './authorized';
import { unauthorized } from './unauthorized';

// That's a signup request's type
interface signUp extends Request {
    userName?: string,
    userEmail?: string,
    userPassword?: string,
    jwtAuthorization?: authorized | unauthorized
}

// Exporting Area
export type { signUp };