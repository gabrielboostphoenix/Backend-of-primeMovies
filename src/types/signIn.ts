// Importing Area
import { Request } from 'express';
import { authorized } from './authorized';
import { unauthorized } from './unauthorized';

// That's a sign-in request's type
interface signIn extends Request {
    userEmail?: string,
    userPassword?: string,
    jwtAuthorization?: authorized | unauthorized
}

// Exporting Area
export { signIn };