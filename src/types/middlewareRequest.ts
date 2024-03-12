// Importing Area
import { Request } from 'express';
import { authorized } from './authorized';
import { unauthorized } from './unauthorized';

// That's a middleware request's type
interface middlewareRequest extends Request {
    userName?: string,
    userEmail?: string,
    userPassword?: string,
    jwtAuthorization?: authorized | unauthorized
}

// Exporting Area
export { middlewareRequest };